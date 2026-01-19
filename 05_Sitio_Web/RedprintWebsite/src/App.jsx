import React, { useState, useEffect } from 'react';
import './App.css';
import heroImg from './assets/hero.png';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [pages, setPages] = useState(5000);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateSavings = (vol) => {
    const traditionalCost = vol * 0.85; // 0.85 per page
    const redprintCost = vol * 0.45; // 0.45 per page
    return Math.round(traditionalCost - redprintCost);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-accent">RED</span>PRINT
          </div>
          <div className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#metodologia">Metodología</a>
            <a href="#tecnologia">Tecnología</a>
            <a href="#ahorro">Calculadora</a>
            <a href="#contacto" className="btn btn-primary btn-sm">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero section-padding">
        <div className="container hero-grid">
          <div className="hero-text animate-fade-in">
            <div className="badge">Líderes en Managed Print Services</div>
            <h1 className="hero-title">
              No solo rentamos impresoras, <br />
              <span className="gradient-text-red">optimizamos tu negocio.</span>
            </h1>
            <p className="hero-description">
              Ayudamos a las empresas a reducir costos operativos y eliminar tiempos de inactividad mediante tecnología de monitoreo remoto y suministros automatizados.
            </p>
            <div className="hero-btns">
              <a href="#servicios" className="btn btn-primary">Ver Planes de Renta</a>
              <a href="#metodologia" className="btn btn-outline">Nuestra Metodología</a>
            </div>
          </div>
          <div className="hero-image-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="hero-glow"></div>
            <img src={heroImg} alt="Redprint Tech" className="hero-img" />
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats container">
        <div className="glass stats-grid">
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Años de Trayectoria</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">1k+</div>
            <div className="stat-label">Tickets Resueltos</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Soporte Tecnológico</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestras Soluciones Integrales</h2>
            <p className="section-subtitle">Cubrimos todas las necesidades tecnológicas de tu oficina.</p>
          </div>
          <div className="services-grid">
            <div className="glass service-card">
              <div className="service-icon">🏢</div>
              <h3>Managed Print Services</h3>
              <p>Renta de equipos multifuncionales (Kyocera, HP, Canon) con todo incluido: tóner, refacciones y servicio técnico proactivo.</p>
            </div>
            <div className="glass service-card">
              <div className="service-icon">📊</div>
              <h3>Software de Control</h3>
              <p>Visualiza quién, qué y cuánto se imprime en tu empresa para eliminar el desperdicio y optimizar recursos.</p>
            </div>
            <div className="glass service-card">
              <div className="service-icon">💻</div>
              <h3>Infraestructura de IT</h3>
              <p>Venta y arrendamiento de laptops, estaciones de trabajo y servidores configurados para alto rendimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodologia" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">El Camino al Ahorro</h2>
            <p className="section-subtitle">Nuestro proceso de 3 pasos para transformar tu oficina.</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-num">01</div>
              <h4>Diagnóstico</h4>
              <p>Analizamos tu volumen actual y puntos de dolor sin costo alguno.</p>
            </div>
            <div className="process-step">
              <div className="step-num">02</div>
              <h4>Implementación</h4>
              <p>Instalamos equipos de última generación y configuramos el monitoreo SNMP.</p>
            </div>
            <div className="process-step">
              <div className="step-num">03</div>
              <h4>Gestión Proactiva</h4>
              <p>Recibes tóner antes de que se agote y mantenimiento antes de que el equipo falle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="ahorro" className="section-padding bg-dark">
        <div className="container ahorro-grid">
          <div className="ahorro-text">
            <h2>Calcula tu Ahorro Estimado</h2>
            <p>Descubre cuánto podrías estar ahorrando mensualmente con nuestra administración inteligente.</p>
            <div className="calculator-input">
              <label>Páginas impresas por mes:</label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
              <div className="range-val">{Number(pages).toLocaleString()} páginas</div>
            </div>
          </div>
          <div className="ahorro-card glass">
            <div className="saving-label">Ahorro Mensual Estimado</div>
            <div className="saving-amount">${calculateSavings(pages).toLocaleString()} MXN</div>
            <p className="saving-note">*Cálculo basado en promedios de mercado vs. plan Redprint.</p>
            <a href="#contacto" className="btn btn-primary full-width">Obtener Cotización Real</a>
          </div>
        </div>
      </section>

      {/* Tech Highlight */}
      <section id="tecnologia" className="tech-section section-padding">
        <div className="container tech-grid">
          <div className="tech-image">
            <div className="tech-glow-red"></div>
            <div className="glass tech-mockup">
              <div className="mockup-header-red">
                <span className="dot-red"></span><span className="dot-red"></span><span className="dot-red"></span>
              </div>
              <div className="mockup-content">
                <div className="mockup-line title-red">Redprint Automation Layer v2.0</div>
                <div className="mockup-line">Scanning Network... <span className="green">14 Devices Active</span></div>
                <div className="mockup-line">Kyocera ECO-500: <span className="red-text">Low Toner Alert</span></div>
                <div className="mockup-line">Action: <span className="white">Courier Dispatched automatically</span></div>
              </div>
            </div>
          </div>
          <div className="tech-text">
            <h2 className="section-title">Tecnología "Zero-Downtime"</h2>
            <p className="tech-description">
              Nuestra arquitectura de automatización actúa como un cerebro central que monitorea la salud de cada componente. No esperes a que se acabe el tóner; nosotros ya lo sabemos.
            </p>
            <ul className="tech-list-red">
              <li>Monitoreo de vida útil de tambores y fusores.</li>
              <li>Reportes de consumo detallados por usuario.</li>
              <li>Integración directa con nuestro ERP para facturación transparente.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h5>¿Qué incluye la renta mensual?</h5>
              <p>Incluye el equipo, todos los consumibles (excepto papel), refacciones, mano de obra y el software de monitoreo remoto.</p>
            </div>
            <div className="faq-item">
              <h5>¿En cuánto tiempo responden a una falla?</h5>
              <p>Nuestro tiempo de respuesta promedio es de 4 horas hábiles. Gracias al monitoreo, muchas veces llegamos antes de que tú lo notes.</p>
            </div>
            <div className="faq-item">
              <h5>¿Puedo cambiar de equipo si mis necesidades crecen?</h5>
              <p>Sí, ofrecemos planes escalables que te permiten actualizar tu flota conforme tu volumen de impresión aumente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact CTA */}
      <footer id="contacto" className="footer section-padding bg-dark">
        <div className="container">
          <div className="footer-top">
            <div className="footer-info">
              <div className="logo logo-white"><span className="logo-accent">RED</span>PRINT</div>
              <p>Transformando la gestión de impresión en México con tecnología e innovación.</p>
            </div>
            <div className="footer-links-grid">
              <div>
                <h6>Navegación</h6>
                <a href="#servicios">Servicios</a>
                <a href="#metodologia">Metodología</a>
                <a href="#tecnologia">Tecnología</a>
              </div>
              <div>
                <h6>Legal</h6>
                <a href="#">Privacidad</a>
                <a href="#">Términos</a>
              </div>
              <div>
                <h6>Contacto</h6>
                <p>📍 Ciudad de México, México</p>
                <p>📞 55 1234 5678</p>
              </div>
            </div>
          </div>
          <div className="footer-cta">
            <h2>Empieza a ahorrar hoy mismo</h2>
            <div className="footer-btns">
              <a href="https://wa.me/your-number" className="btn btn-primary">Hablar con un Consultor</a>
              <a href="mailto:contacto@redprint.mx" className="btn btn-outline">Enviar Email</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Redprint. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
