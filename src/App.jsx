import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, Heart, Instagram, MapPin, Menu, MessageCircle, ShieldCheck, Sparkles, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import facadeImage from "../assets/fachada-rua.png";
import clinicLogo from "../assets/logo.jpg";
import { clinicConfig, clinicImages, getMapsUrl, getWhatsAppUrl, trackConversion } from "./lib/clinicConfig.js";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["Início", "#inicio"],
  ["A clínica", "#sobre"],
  ["Tratamentos", "#tratamentos"],
  ["Nossa equipe", "#equipe"],
  ["Conteúdos", "#conteudos"],
  ["Contato", "#contato"],
];

const treatments = [
  ["01", "Prevenção e saúde bucal", "O cuidado preventivo ajuda a acompanhar a saúde da sua boca e a identificar necessidades que merecem atenção.", "01"],
  ["02", "Ortodontia", "Conheça as possibilidades de tratamento ortodôntico e receba orientação profissional sobre o cuidado com o alinhamento dos dentes.", "02"],
  ["03", "Odontopediatria", "Um cuidado pensado para acompanhar a saúde bucal das crianças, respeitando cada fase do desenvolvimento.", "03"],
  ["04", "Restauração dentária", "Conheça as opções de tratamento para dentes que precisam recuperar sua estrutura e função, conforme avaliação profissional.", "04"],
  ["05", "Clareamento dental", "Receba orientação sobre as possibilidades de clareamento dental e os cuidados indicados para o seu caso.", "05"],
  ["06", "Implantes e reabilitação oral", "Conheça as alternativas de reabilitação oral disponíveis, conforme suas necessidades e avaliação odontológica.", "06"],
];

const features = [
  { icon: Heart, title: "Atenção individualizada", text: "Cada pessoa tem necessidades próprias. A avaliação profissional é o ponto de partida para compreender cada caso e orientar os próximos passos." },
  { icon: MessageCircle, title: "Informação e orientação", text: "Acreditamos que entender o tratamento faz parte de uma experiência mais tranquila. Por isso, a comunicação clara é essencial durante o atendimento." },
  { icon: ShieldCheck, title: "Cuidado em cada etapa", text: "Do primeiro contato ao acompanhamento profissional, cada etapa deve ser conduzida com responsabilidade e atenção." },
  { icon: Sparkles, title: "Uma equipe para cuidar de você", text: "Conheça os profissionais e saiba quem poderá acompanhar seu atendimento." },
];

const stories = [
  ["01", "Como cuidar da saúde bucal no dia a dia", clinicImages.editorial[0]],
  ["02", "Quando procurar avaliação odontológica?", clinicImages.editorial[1]],
  ["03", "Saúde bucal na infância", clinicImages.editorial[2]],
  ["04", "Conheça os cuidados relacionados à restauração dentária", clinicImages.editorial[0]],
];

function Image({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`image-frame ${className}${failed ? " image-fallback" : ""}`}>
      {failed ? (
        <div className="image-fallback-content" aria-label="Imagem temporária indisponível">
          <span>Centro Odontológico</span><small>Cariacica</small>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width="1200"
          height="900"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function SectionIntro({ eyebrow, title, children, className = "" }) {
  return (
    <div className={`section-intro ${className}`} data-reveal>
      <span className="eyebrow"><span />{eyebrow}</span>
      <h2>{title}</h2>
      {children && <div className="section-intro-copy">{children}</div>}
    </div>
  );
}

function ContactLink({ children, href = "#contato", className = "", action = "contact" }) {
  return (
    <a className={className} href={href} onClick={() => trackConversion(action)}>
      {children}
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner shell">
        <a className="wordmark" href="#inicio" aria-label={`${clinicConfig.name} — início`} onClick={() => setMenuOpen(false)}>
          <img className="clinic-logo" src={clinicLogo} alt="" />
          <span className="wordmark-text"><strong>Centro Odontológico</strong><small>Cariacica</small></span>
        </a>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <ContactLink className="button button-small nav-cta" action="primary-cta">Agendar consulta <ArrowUpRight size={15} /></ContactLink>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegação móvel" aria-hidden={!menuOpen} inert={!menuOpen}>
        {navItems.map(([label, href]) => (
          <a key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>
        ))}
        <ContactLink className="button mobile-cta" action="primary-cta" href="#contato">Agendar consulta <ArrowUpRight size={16} /></ContactLink>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-grid shell">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><span />CENTRO ODONTOLÓGICO CARIACICA</span>
          <h1>Seu sorriso merece <em>cuidado</em> em cada detalhe.</h1>
          <p className="hero-description">Um espaço para cuidar da sua saúde bucal com atenção, orientação e uma equipe preparada para acompanhar você em cada etapa do seu tratamento.</p>
          <div className="hero-actions">
            <ContactLink className="button" action="primary-cta">Quero agendar uma consulta <ArrowUpRight size={17} /></ContactLink>
            <a className="text-link" href="#sobre">Conheça a clínica <ArrowDownRight size={17} /></a>
          </div>
          <p className="hero-note"><span className="note-mark"><Check size={13} /></span>Entre em contato com nossa equipe e saiba como agendar seu atendimento.</p>
        </div>
        <div className="hero-visual" data-reveal>
          <div className="hero-photo-wrap">
            <Image src={clinicImages.hero} alt="Imagem conceitual de profissional odontológico orientando paciente durante atendimento" eager className="hero-photo" />
          </div>
          <div className="hero-stamp"><span>um cuidado</span><strong>feito<br />para você</strong><ArrowDownRight size={22} /></div>
          <span className="hero-index">01 <i /> 04</span>
          <span className="image-caption">IMAGEM CONCEITUAL · SUBSTITUIR POR FOTO OFICIAL</span>
        </div>
      </div>
      <a href="#sobre" className="scroll-cue" aria-label="Rolar para conhecer a clínica"><span>role para descobrir</span><ArrowDown size={15} /></a>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="sobre">
      <div className="about-grid shell">
        <div className="about-visual" data-reveal>
          <div className="about-image"><Image src={clinicImages.about} alt="Imagem conceitual de ambiente odontológico contemporâneo" /></div>
          <div className="about-image-accent" aria-hidden="true" />
          <div className="about-caption"><span>O cuidado começa</span><strong>na escuta.</strong></div>
          <span className="image-caption">IMAGEM CONCEITUAL · SUBSTITUIR POR FOTO OFICIAL</span>
        </div>
        <div className="about-copy">
          <SectionIntro eyebrow="SEJA BEM-VINDO(A)" title="Mais do que cuidar de sorrisos, cuidar de pessoas.">
            <p>Acreditamos que cada pessoa merece ser acolhida, ouvida e orientada durante seu cuidado odontológico.</p>
            <p>Por isso, buscamos tornar cada etapa do atendimento mais clara e tranquila, oferecendo informações para que você compreenda suas necessidades e conheça as possibilidades de tratamento.</p>
            <p>Aqui, o cuidado começa na escuta e continua em cada detalhe da sua experiência.</p>
          </SectionIntro>
          <ContactLink className="text-link about-link" href="#contato">Conheça nossa clínica <ArrowUpRight size={17} /></ContactLink>
        </div>
      </div>
      <p className="concept-note shell">Proposta de comunicação para demonstração. Conteúdo sujeito à validação da clínica.</p>
    </section>
  );
}

function Treatments() {
  return (
    <section className="treatments section-pad" id="tratamentos">
      <div className="shell">
        <div className="treatments-heading">
          <SectionIntro eyebrow="COMO PODEMOS CUIDAR DE VOCÊ?" title="Cada sorriso tem suas necessidades. Nosso cuidado começa por entendê-las.">
            <p>Conheça as possibilidades de cuidado odontológico oferecidas pela nossa equipe.</p>
          </SectionIntro>
          <span className="section-index">02 <i /> 04</span>
        </div>
        <div className="treatment-grid">
          {treatments.map(([number, title, text, image]) => (
            <a className="treatment-card" href="#contato" key={title} onClick={() => trackConversion(`treatment-${number}`)}>
              <div className="treatment-image">
                <Image src={clinicImages.treatments[Number(image) - 1]} alt="" />
                <span className="treatment-number">{number}</span>
                <span className="card-arrow"><ArrowUpRight size={18} /></span>
              </div>
              <div className="treatment-copy">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="treatments-bottom">
          <p>Os tratamentos e especialidades listados são sugestões iniciais e precisam ser confirmados pela clínica.</p>
          <ContactLink className="text-link" action="treatment-contact">Quero saber mais sobre os tratamentos <ArrowUpRight size={17} /></ContactLink>
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section className="commitment section-pad">
      <div className="commitment-inner shell">
        <div className="commitment-heading">
          <SectionIntro eyebrow="NOSSO COMPROMISSO" title="Cuidado que vai além da consulta." />
          <p className="commitment-intro">Uma experiência mais tranquila começa com atenção, informação e respeito a cada pessoa.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-item" key={title}>
              <span className="feature-icon"><Icon size={21} strokeWidth={1.5} /></span>
              <span className="feature-count">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="concept-note">Os diferenciais descritos são propostas de comunicação e devem ser validados pela clínica.</p>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="team section-pad" id="equipe">
      <div className="team-grid shell">
        <div className="team-copy">
          <SectionIntro eyebrow="QUEM CUIDA DE VOCÊ" title="Pessoas por trás de cada sorriso.">
            <p>Conheça os profissionais do Centro Odontológico Cariacica, suas áreas de atuação e a formação que orienta seu trabalho.</p>
          </SectionIntro>
          <ContactLink className="text-link" href="#contato">Conheça nossa equipe <ArrowUpRight size={17} /></ContactLink>
        </div>
        <div className="team-placeholder" data-reveal>
          <div className="team-orbit orbit-one" aria-hidden="true" />
          <div className="team-orbit orbit-two" aria-hidden="true" />
          <div className="team-placeholder-content">
            <span className="team-placeholder-icon"><Heart size={24} strokeWidth={1.4} /></span>
            <span className="eyebrow">UM ESPAÇO PARA QUEM CUIDA</span>
            <strong>Conheça os profissionais que fazem parte desta história.</strong>
            <p>Fotos, nomes, especialidades e registros profissionais serão adicionados após confirmação da clínica.</p>
            <span className="team-status"><span /> EQUIPE A VALIDAR</span>
          </div>
          <div className="team-caption">UM RETRATO COLETIVO, AINDA POR REVELAR</div>
        </div>
      </div>
    </section>
  );
}

function EducationalContent() {
  return (
    <section className="journal section-pad" id="conteudos">
      <div className="shell">
        <div className="journal-heading">
          <SectionIntro eyebrow="INFORMAÇÃO TAMBÉM É CUIDADO" title="Entenda melhor sua saúde bucal.">
            <p>Reunimos conteúdos para ajudar você a conhecer os cuidados com a saúde bucal, esclarecer dúvidas comuns e entender melhor os tratamentos odontológicos.</p>
          </SectionIntro>
          <a className="text-link instagram-link" href={clinicConfig.instagram} target="_blank" rel="noreferrer" onClick={() => trackConversion("instagram")}>
            <Instagram size={17} /> Acompanhe nossos conteúdos no Instagram <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="journal-grid">
          {stories.map(([number, title, image]) => (
            <article className="journal-card" key={number}>
              <div className="journal-image"><Image src={image} alt="" /><span className="journal-number">IDEIA {number}</span></div>
              <div className="journal-card-copy"><span>SAÚDE BUCAL <i /> CONTEÚDO DEMONSTRATIVO</span><h3>{title}</h3><a href={clinicConfig.instagram} target="_blank" rel="noreferrer" aria-label={`Acompanhe conteúdos sobre: ${title}`} onClick={() => trackConversion("instagram")}>Explorar tema <ArrowUpRight size={15} /></a></div>
            </article>
          ))}
        </div>
        <p className="concept-note">Temas conceituais para demonstração; não representam publicações oficiais da clínica.</p>
      </div>
    </section>
  );
}

function FinalCTA() {
  const whatsappUrl = getWhatsAppUrl("Olá! Gostaria de saber sobre o atendimento do Centro Odontológico Cariacica.");
  return (
    <section className="final-cta section-pad">
      <div className="cta-orb cta-orb-one" aria-hidden="true" />
      <div className="cta-orb cta-orb-two" aria-hidden="true" />
      <div className="final-cta-inner shell" data-reveal>
        <span className="eyebrow"><span />ESTAMOS AQUI PARA CUIDAR DE VOCÊ</span>
        <h2>Vamos dar o próximo passo no cuidado com seu sorriso?</h2>
        <p>Entre em contato com nossa equipe para tirar dúvidas sobre o atendimento e consultar as possibilidades de agendamento.</p>
        <div className="cta-actions">
          <ContactLink className="button button-light" href={whatsappUrl || "#contato"} action={whatsappUrl ? "whatsapp" : "contact"}>
            Agendar consulta pelo WhatsApp <ArrowUpRight size={17} />
          </ContactLink>
          <ContactLink className="cta-secondary" href="#contato" action={clinicConfig.mapUrl ? "location" : "contact"}>Ver localização <ArrowDownRight size={17} /></ContactLink>
        </div>
        {!whatsappUrl && <span className="cta-note">WhatsApp e localização serão ativados após confirmação dos dados oficiais.</span>}
      </div>
      <span className="cta-side-label" aria-hidden="true">CUIDAR É SE FAZER PRESENTE</span>
    </section>
  );
}

function Contact() {
  const whatsappUrl = getWhatsAppUrl();
  const mapsUrl = getMapsUrl();
  const contactUrl = whatsappUrl || clinicConfig.instagram;
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section className="contact location-section section-pad" id="contato">
      <div className="shell">
        <div className="location-heading">
          <SectionIntro eyebrow="NOSSA LOCALIZAÇÃO" title="Sua saúde bucal mais perto de você.">
            <p>Estamos em Campo Grande, Cariacica, na Avenida Expedito Garcia, 140. Uma localização de fácil identificação, próxima a estabelecimentos conhecidos da região.</p>
          </SectionIntro>
          <span className="location-tag"><MapPin size={15} /> CAMPO GRANDE · CARIACICA, ES</span>
        </div>
        <div className="location-grid">
          <div className="location-visual" data-reveal>
            <img
              className="location-facade-image"
              src={facadeImage}
              alt="Vista da Avenida Expedito Garcia, em Campo Grande, com os estabelecimentos comerciais próximos à clínica."
              width="1141"
              height="1430"
              loading="lazy"
            />
            <div className="location-photo-label">
              <span><MapPin size={14} /> AVENIDA EXPEDITO GARCIA</span>
              <strong>Campo Grande · Cariacica, ES</strong>
            </div>
            <a className="location-photo-link" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir localização da clínica no Google Maps" onClick={() => trackConversion("location")}>
              <MapPin size={19} />
            </a>
          </div>
          <div className="location-information">
            <div className="location-address">
              <span className="eyebrow"><span /> ENDEREÇO</span>
              <h3>{clinicConfig.name}</h3>
              <p>{clinicConfig.address}<br />{clinicConfig.neighborhood} — {clinicConfig.city}</p>
            </div>
            <div className="location-references">
              <h3>Como encontrar a clínica:</h3>
              <ul>
                {clinicConfig.locationReferences.map((reference, index) => (
                  <li className="location-reference" key={reference}>
                    <span>0{index + 1}</span>{reference}
                  </li>
                ))}
              </ul>
            </div>
            <div className="location-actions">
              {mapsUrl && (
                <a className="button" href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("location")}>
                  Como chegar <ArrowUpRight size={17} />
                </a>
              )}
              <a className="button button-outline" href={contactUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion(whatsappUrl ? "whatsapp" : "instagram")}>
                Falar com a clínica <ArrowUpRight size={17} />
              </a>
            </div>
            <button
              className="text-link location-map-toggle"
              type="button"
              aria-expanded={mapOpen}
              aria-controls="clinic-map"
              onClick={() => setMapOpen((open) => !open)}
            >
              {mapOpen ? "Fechar mapa" : "Ver mapa da região"}
              <ArrowDownRight size={16} />
            </button>
            {mapOpen && clinicConfig.mapEmbedUrl && (
              <div className="location-map" id="clinic-map">
                <iframe
                  src={clinicConfig.mapEmbedUrl}
                  title={`Mapa da localização do ${clinicConfig.name}`}
                  width="600"
                  height="450"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
            <p className="location-brand-line">“Saúde bucal mais perto de você.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const whatsappUrl = getWhatsAppUrl();
  const links = [
    ["Início", "#inicio"],
    ["A clínica", "#sobre"],
    ["Tratamentos", "#tratamentos"],
    ["Nossa equipe", "#equipe"],
    ["Contato", "#contato"],
    ["Localização", "#contato"],
  ];
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div className="footer-brand">
          <a className="wordmark footer-wordmark" href="#inicio">
            <img className="clinic-logo" src={clinicLogo} alt="" />
            <span className="wordmark-text"><strong>Centro Odontológico</strong><small>Cariacica</small></span>
          </a>
          <p>Cuidado, orientação e atenção à saúde do seu sorriso.</p>
        </div>
        <div className="footer-nav"><span className="footer-label">NAVEGUE</span>{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>
        <div className="footer-nav footer-social"><span className="footer-label">ACOMPANHE</span>
          <a href={clinicConfig.instagram} target="_blank" rel="noreferrer" onClick={() => trackConversion("instagram")}>Instagram <ArrowUpRight size={14} /></a>
          {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp")}>WhatsApp <ArrowUpRight size={14} /></a> : <span>WhatsApp a confirmar</span>}
          <span>Política de privacidade a definir</span>
        </div>
        <a href="#inicio" className="back-top" aria-label="Voltar ao início"><ArrowUpRight size={20} /></a>
      </div>
      <div className="footer-bottom shell">
        <span>© Centro Odontológico Cariacica. Todos os direitos reservados.</span>
        <span>As informações deste site têm caráter informativo e não substituem uma avaliação odontológica individual.</span>
        <span className="legal-note">Informações do responsável técnico e identificação institucional a confirmar.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const motion = gsap.matchMedia();
    const context = gsap.context(() => {
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-eyebrow, .hero h1, .hero-description, .hero-actions, .hero-note", {
          y: 20,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.12,
        });
        gsap.from(".hero-visual", {
          y: 24,
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.24,
        });
        gsap.from(".hero-stamp", {
          scale: 0.88,
          rotation: -17,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
          delay: 0.55,
        });
        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          if (element.closest(".hero")) return;
          gsap.from(element, {
            y: 22,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });
        gsap.from(".treatment-card", {
          y: 22,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: ".treatment-grid", start: "top 86%", once: true },
        });
        gsap.from(".location-reference", {
          y: 12,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".location-references", start: "top 88%", once: true },
        });
        gsap.from(".feature-item", {
          y: 18,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".feature-grid", start: "top 86%", once: true },
        });
        gsap.from(".journal-card", {
          y: 20,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".journal-grid", start: "top 86%", once: true },
        });
        gsap.from(".about-image img", {
          scale: 1.08,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-visual", start: "top 82%", once: true },
        });
        gsap.from(".location-facade-image", {
          scale: 1.06,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".location-visual", start: "top 85%", once: true },
        });
        gsap.from(".location-photo-label > *", {
          y: 14,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".location-visual", start: "top 82%", once: true },
        });
      });
    }, pageRef);
    return () => {
      context.revert();
      motion.revert();
    };
  }, []);

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Treatments />
        <Differentials />
        <Team />
        <EducationalContent />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <a className="floating-contact" href="#contato" aria-label="Acessar informações de contato" onClick={() => trackConversion("contact")}>
        <MessageCircle size={19} /><span>Fale com a clínica</span>
      </a>
    </div>
  );
}
