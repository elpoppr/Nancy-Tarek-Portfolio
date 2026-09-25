import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as THREE from 'three';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Circle,
  ExternalLink,
  Instagram,
  Linkedin,
  Menu,
  MoveDown,
  Plus,
  X,
} from 'lucide-react';
import siteContent, { type Project } from './config/siteContent';

function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.8);

    const context =
      canvas.getContext('webgl2', { alpha: true, antialias: window.innerWidth > 700 }) ??
      canvas.getContext('webgl', { alpha: true, antialias: window.innerWidth > 700 });
    if (!context) {
      canvas.dataset.fallback = 'true';
      return () => {
        delete canvas.dataset.fallback;
      };
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: window.innerWidth > 700,
        powerPreference: 'high-performance',
      });
    } catch {
      canvas.dataset.fallback = 'true';
      return () => {
        delete canvas.dataset.fallback;
      };
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.1 : 1.6));
    renderer.setClearColor(0x000000, 0);

    const group = new THREE.Group();
    scene.add(group);

    const metal = new THREE.MeshStandardMaterial({
      color: 0x927d68,
      metalness: 0.8,
      roughness: 0.28,
      transparent: true,
      opacity: 0.72,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x718c8a,
      metalness: 0.12,
      roughness: 0.08,
      transmission: 0.7,
      transparent: true,
      opacity: 0.48,
      ior: 1.45,
    });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xbba792,
      transparent: true,
      opacity: 0.25,
    });

    const objects: THREE.Object3D[] = [];
    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(1.25, 1), glass);
    octahedron.position.set(-2.05, 0.35, -0.9);
    octahedron.rotation.set(0.3, 0.4, 0.1);
    group.add(octahedron);
    objects.push(octahedron);

    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.025, 8, 96), lineMaterial);
    torus.position.set(2.25, -0.4, -1.8);
    torus.rotation.set(0.8, 0.25, -0.25);
    group.add(torus);
    objects.push(torus);

    const prism = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 0), metal);
    prism.position.set(1.1, 1.55, -2.8);
    prism.rotation.set(0.1, 0.5, 0.7);
    group.add(prism);
    objects.push(prism);

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.4, 3.6, 0.18)),
      new THREE.LineBasicMaterial({ color: 0xc4ad8e, transparent: true, opacity: 0.25 }),
    );
    frame.position.set(-0.55, -0.4, -3.2);
    frame.rotation.y = -0.24;
    group.add(frame);
    objects.push(frame);

    const particleCount = window.innerWidth < 700 ? 90 : 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 8;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(particlePositions, 3)),
      new THREE.PointsMaterial({ color: 0xc5b8a6, size: window.innerWidth < 700 ? 0.018 : 0.025, transparent: true, opacity: 0.52 }),
    );
    group.add(particles);

    const warmLight = new THREE.PointLight(0xb38b69, 4, 9);
    warmLight.position.set(-3.8, 2.7, 4);
    scene.add(warmLight);
    const coolLight = new THREE.PointLight(0x6e8d8b, 3.2, 8);
    coolLight.position.set(4, -2, 1);
    scene.add(coolLight);
    scene.add(new THREE.AmbientLight(0x5d5a56, 0.8));

    let targetProgress = 0;
    let currentProgress = 0;
    let frameId = 0;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
    };
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 700 ? 1.1 : 1.6));
    };
    const animate = (time: number) => {
      currentProgress += (targetProgress - currentProgress) * 0.055;
      const t = time * 0.00025;
      camera.position.x = Math.sin(currentProgress * Math.PI * 1.7) * 0.55;
      camera.position.y = 0.2 + currentProgress * 1.25;
      camera.position.z = 7.8 - currentProgress * 2.5;
      camera.rotation.z = currentProgress * -0.08;
      group.rotation.y = t * 1.8 + currentProgress * Math.PI * 0.9;
      group.rotation.x = Math.sin(t) * 0.08 + currentProgress * 0.3;
      objects[0].position.y = 0.35 + Math.sin(t * 2) * 0.18 - currentProgress * 0.3;
      objects[1].rotation.z = -0.25 + currentProgress * 1.4;
      objects[2].scale.setScalar(1 - currentProgress * 0.34);
      particles.rotation.y = -t * 0.4;
      warmLight.intensity = 3.3 + Math.sin(t * 2) * 0.6;
      coolLight.intensity = 2.2 + currentProgress * 2;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    onScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material: THREE.Material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}

function BrandMark({ variant }: { variant: 'header' | 'footer' }) {
  const { logo } = siteContent;
  if (logo.src) {
    return <img className={`custom-logo custom-logo-${variant}`} src={logo.src} alt={logo.alt} />;
  }
  if (variant === 'footer') {
    return <span className="footer-mark">NT<span className="monogram-dot">.</span></span>;
  }
  return <>NT<span className="monogram-dot">.</span></>;
}

function Nav({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };
  return (
    <header className={`site-header ${open ? 'is-open' : ''}`} data-testid="site-header">
      <button className="monogram" onClick={() => go('top')} aria-label="Back to top" data-testid="button-back-to-top">
        <BrandMark variant="header" />
      </button>
      <div className="header-mark">
        {siteContent.personal.professionalTitle} <span>/</span> {siteContent.personal.location} · {siteContent.personal.practicePeriod}
      </div>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <button onClick={() => go('work')} data-testid="link-work">Work</button>
        <button onClick={() => go('about')} data-testid="link-about">About</button>
        <button onClick={() => go('services')} data-testid="link-services">Services</button>
        <button className="nav-contact" onClick={onContact} data-testid="button-nav-contact">Start a conversation <ArrowUpRight size={14} /></button>
      </nav>
      <button className="menu-trigger" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" data-testid="button-menu">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div className="mobile-nav">
        <button onClick={() => go('work')} data-testid="mobile-link-work">Work</button>
        <button onClick={() => go('about')} data-testid="mobile-link-about">About</button>
        <button onClick={() => go('services')} data-testid="mobile-link-services">Services</button>
        <button onClick={onContact} data-testid="mobile-button-contact">Start a conversation <ArrowUpRight size={14} /></button>
      </div>
    </header>
  );
}

function MediaFrame({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const [hasMedia, setHasMedia] = useState(Boolean(project.mediaPath));
  return (
    <button className={`project-frame frame-${project.tone}`} onClick={() => onOpen(project)} data-testid={`button-project-${project.id}`}>
      <span className="frame-index">{project.index} / {String(siteContent.projects.length).padStart(2, '0')}</span>
      {hasMedia ? (
        project.mediaKind === 'video' ? (
          <video
            src={project.mediaPath}
            muted
            loop
            autoPlay
            playsInline
            onError={() => setHasMedia(false)}
            className="optional-media"
            aria-label={`${project.title} video preview`}
          />
        ) : (
          <img
            src={project.mediaPath}
            alt=""
            onError={() => setHasMedia(false)}
            className="optional-media"
          />
        )
      ) : null}
      {!hasMedia && (
        <span className="empty-media">
          <span className="empty-media-mark"><Plus size={15} /></span>
          <span>Media slot / add to <strong>public/media/nancy-tarek</strong></span>
        </span>
      )}
      <span className="frame-arrow"><ArrowUpRight size={18} /></span>
      <span className="frame-grain" />
    </button>
  );
}

function ProjectModalMedia({ project }: { project: Project }) {
  const [hasMedia, setHasMedia] = useState(Boolean(project.mediaPath));
  if (!hasMedia || !project.mediaPath) {
    return (
      <div className="modal-media-placeholder">
        <span className="empty-media-mark"><Plus size={16} /></span>
        <span>Project media will appear here</span>
      </div>
    );
  }

  if (project.mediaKind === 'video') {
    return (
      <video
        src={project.mediaPath}
        muted
        loop
        autoPlay
        playsInline
        onError={() => setHasMedia(false)}
        className="modal-media-content"
        aria-label={`${project.title} video`}
      />
    );
  }

  return (
    <img
      src={project.mediaPath}
      alt={project.title}
      onError={() => setHasMedia(false)}
      className="modal-media-content"
    />
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileNavHint, setMobileNavHint] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    const onResize = () => setMobileNavHint(window.innerWidth < 720);
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const goToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${String(values.get('name') || '')}`);
    const body = encodeURIComponent(`Name: ${String(values.get('name') || '')}\nEmail: ${String(values.get('email') || '')}\n\n${String(values.get('message') || '')}`);
    window.location.href = `mailto:${siteContent.personal.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="portfolio-shell" id="top">
      <SceneCanvas />
      <div className="film-grain" aria-hidden="true" />
      <Nav onContact={goToContact} />

      <div className="section-rail" aria-hidden="true">
        <span>00</span><i /><span>05</span>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true"><span>Scroll to enter</span><MoveDown size={15} /></div>

      <section className="hero section-pad" data-testid="section-hero">
        <div className="hero-kicker reveal"><Circle size={8} fill="currentColor" /> {siteContent.personal.hero.kicker}</div>
        <div className="hero-title-wrap">
          <p className="eyebrow reveal">{siteContent.personal.name} <span>— {siteContent.personal.hero.eyebrowSuffix}</span></p>
          <h1 className="hero-title reveal">
            {siteContent.personal.hero.headline.leading}<br />
            <em>{siteContent.personal.hero.headline.emphasis}</em><br />
            {siteContent.personal.hero.headline.trailing}<span className="title-period">.</span>
          </h1>
        </div>
        <div className="hero-bottom reveal">
          <p>{siteContent.personal.hero.description}</p>
          <span className="hero-location">{siteContent.personal.hero.locationLabel}</span>
        </div>
      </section>

      <section className="statement section-pad" data-testid="section-statement">
        <div className="section-label"><span>01</span><span>Point of view</span></div>
        <div className="statement-copy reveal">
          <p className="large-copy">Good design doesn’t ask for attention.<br /><span>It earns a second look.</span></p>
          <div className="statement-aside">
            <span className="vertical-rule" />
            <p>Working across identity, editorial, and screen, I make visual systems with a pulse — clear enough to work, distinct enough to remember.</p>
          </div>
        </div>
      </section>

      <section className="work-section section-pad" id="work" data-testid="section-work">
        <div className="section-heading reveal">
          <div className="section-label"><span>02</span><span>Selected work</span></div>
          <p className="section-note">A selection of visual design<br />and motion work.</p>
        </div>
        <div className="projects-grid">
          {siteContent.projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1} reveal`} key={project.id} data-testid={`card-project-${project.id}`}>
              <MediaFrame project={project} onOpen={setSelectedProject} />
              <div className="project-meta">
                <div>
                  <span className="project-category">{project.category} / {project.year}</span>
                  <h2>{project.title}</h2>
                </div>
                <span className="project-open-label">Open frame <ArrowUpRight size={14} /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about" data-testid="section-about">
        <div className="section-label"><span>03</span><span>{siteContent.personal.about.sectionTitle}</span></div>
        <div className="about-layout">
          <div className="about-title reveal"><span className="about-symbol">{siteContent.personal.name.charAt(0)}</span><p>{siteContent.personal.about.titleLeading}<br /><em>{siteContent.personal.about.titleEmphasis}</em></p></div>
          <div className="about-copy reveal">
            <p className="large-copy">{siteContent.personal.about.largeDescription}</p>
            <p>{siteContent.personal.about.description}</p>
            <button className="text-link" onClick={goToContact} data-testid="button-about-contact">{siteContent.personal.about.ctaLabel} <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services" data-testid="section-services">
        <div className="section-heading reveal">
          <div className="section-label"><span>04</span><span>Ways of working</span></div>
          <span className="services-count">{String(siteContent.services.length).padStart(2, '0')} / offerings</span>
        </div>
        <div className="services-list">
          {siteContent.services.map((service) => (
            <button className="service-row reveal" key={service.number} onClick={goToContact} data-testid={`button-service-${service.number}`}>
              <span className="service-number">{service.number}</span>
              <span className="service-title">{service.title}</span>
              <span className="service-copy">{service.description}</span>
              <ArrowUpRight className="service-arrow" size={18} />
            </button>
          ))}
        </div>
        <div className="marquee" aria-hidden="true"><span>clarity / character / craft / clarity / character / craft / </span></div>
      </section>

      <section className="contact-section section-pad" id="contact" data-testid="section-contact">
        <div className="section-label"><span>05</span><span>Contact</span></div>
        <div className="contact-layout">
          <div className="contact-intro reveal">
            <p className="eyebrow">{siteContent.personal.contact.eyebrow}</p>
            <h2>{siteContent.personal.contact.headlineLeading}<br /><em>{siteContent.personal.contact.headlineEmphasis}</em></h2>
            <p className="contact-description">{siteContent.personal.contact.description}</p>
            <a href={`mailto:${siteContent.personal.contact.email}`} className="email-link" data-testid="link-email">{siteContent.personal.contact.email} <ArrowUpRight size={16} /></a>
            {(siteContent.personal.contact.instagramUrl || siteContent.personal.contact.linkedinUrl) && <div className="socials">
              {siteContent.personal.contact.instagramUrl && <a href={siteContent.personal.contact.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-instagram"><Instagram size={16} /> Instagram</a>}
              {siteContent.personal.contact.linkedinUrl && <a href={siteContent.personal.contact.linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={16} /> LinkedIn</a>}
            </div>}
          </div>
          <form className="contact-form reveal" onSubmit={handleSubmit} data-testid="form-contact">
            <label><span>01 / Your name</span><input required name="name" placeholder="Name" data-testid="input-name" /></label>
            <label><span>02 / Your email</span><input required type="email" name="email" placeholder="name@studio.com" data-testid="input-email" /></label>
            <label><span>03 / A few words</span><textarea required name="message" placeholder="Tell me a little about the project..." rows={3} data-testid="input-message" /></label>
            <button className="submit-button" type="submit" data-testid="button-submit-contact">
              <>Open email draft <ArrowUpRight size={16} /></>
            </button>
          </form>
        </div>
      </section>

      <footer className="site-footer section-pad">
        <div className="footer-rule" />
        <div><BrandMark variant="footer" /><span className="footer-caption">{siteContent.personal.professionalTitle} / {siteContent.personal.location}</span></div>
        <div className="footer-credits">
          <span>© {siteContent.personal.name} {siteContent.copyrightYear}</span>
          <span className="developer-credit">
            Developed by <span dir="auto">{siteContent.developer.name}</span> ·{' '}
            <a href={siteContent.developer.url} target="_blank" rel="noreferrer">{siteContent.developer.company}</a>
          </span>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-footer-top">Back to top <ChevronDown size={15} /></button>
      </footer>

      {mobileNavHint && <div className="mobile-orbit" aria-hidden="true"><span /></div>}

      {selectedProject && (
        <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project detail" data-testid="button-close-project"><X size={18} /></button>
            <div className={`modal-media frame-${selectedProject.tone}`}><ProjectModalMedia project={selectedProject} /></div>
            <span className="project-category">{selectedProject.index} / {selectedProject.category} / {selectedProject.year}</span>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            {selectedProject.url && (
              <a className="modal-project-link" href={selectedProject.url} target="_blank" rel="noreferrer">
                View project <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;