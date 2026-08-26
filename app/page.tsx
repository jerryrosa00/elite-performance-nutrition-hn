'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const categories = ['Todos', 'Proteína', 'Rendimiento', 'Bienestar'] as const;
type Category = (typeof categories)[number];

const products = [
  { name: 'Whey Protein', category: 'Proteína', note: '24 g de proteína', size: '2 lb · 28 porciones', price: 'L 1,390', tone: 'lime', badge: 'Más vendido' },
  { name: 'Creatina Mono', category: 'Rendimiento', note: 'Fuerza y potencia', size: '300 g · 60 porciones', price: 'L 690', tone: 'violet', badge: 'Esencial' },
  { name: 'Pre-Workout', category: 'Rendimiento', note: 'Energía y enfoque', size: '30 porciones', price: 'L 850', tone: 'orange', badge: 'Intenso' },
  { name: 'Omega 3', category: 'Bienestar', note: 'Bienestar diario', size: '100 cápsulas', price: 'L 520', tone: 'blue', badge: 'Diario' },
  { name: 'Magnesio + Zinc', category: 'Bienestar', note: 'Descanso y recuperación', size: '90 cápsulas', price: 'L 450', tone: 'sand', badge: 'Recuperación' },
  { name: 'ISO Whey', category: 'Proteína', note: 'Proteína aislada', size: '5 lb · 70 porciones', price: 'L 2,590', tone: 'pink', badge: 'Premium' },
  { name: 'BCAA + Glutamina', category: 'Rendimiento', note: 'Soporte muscular', size: '30 porciones', price: 'L 760', tone: 'aqua', badge: 'Entrenamiento' },
  { name: 'Multivitamínico', category: 'Bienestar', note: 'Base nutricional', size: '60 cápsulas', price: 'L 480', tone: 'yellow', badge: 'Completo' },
];

const goals = [
  { number: '01', title: 'Ganar masa', copy: 'Proteínas y creatina para acompañar tu plan de fuerza.', filter: 'Proteína' as Category },
  { number: '02', title: 'Rendir más', copy: 'Energía, enfoque y soporte para cada repetición.', filter: 'Rendimiento' as Category },
  { number: '03', title: 'Recuperarte', copy: 'Esenciales diarios para descanso y bienestar.', filter: 'Bienestar' as Category },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [selectedProduct, setSelectedProduct] = useState('Whey Protein');

  const filteredProducts = useMemo(
    () => activeCategory === 'Todos' ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const chooseProduct = (productName: string) => {
    setSelectedProduct(productName);
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const chooseGoal = (filter: Category) => {
    setActiveCategory(filter);
    document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Elite Performance Nutrition, me interesa ${selectedProduct}. ¿Me ayudan con disponibilidad, sabores y entrega?`,
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Elite Performance Nutrition, inicio">
          <span className="brand-logo"><Image src="/elite-logo.png" alt="" width={46} height={46} /></span>
          <span>ELITE PERFORMANCE <em>NUTRITION</em></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#catalogo">Productos</a>
          <a href="#objetivos">Tu objetivo</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <a className="button button-small" href="#contacto">Consultar</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> SUPLEMENTOS ORIGINALES · HONDURAS</p>
          <h1>Elevá tu<br />rendimiento.<br /><strong>Sin límites.</strong></h1>
          <p className="hero-description">
            Proteína, creatina y esenciales seleccionados para que entrenés con intención y recuperés mejor.
          </p>
          <div className="hero-actions">
            <a className="button" href="#catalogo">Ver productos <span>↗</span></a>
            <a className="text-link" href="#contacto">Consultar por WhatsApp <span>→</span></a>
          </div>
          <div className="trust-row">
            <div><b>100%</b><span>productos originales</span></div>
            <div><b>Envíos</b><span>a nivel nacional</span></div>
            <div><b>1 a 1</b><span>asesoría real</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Proteína deportiva y cuchara medidora">
          <Image src="/hero-protein.jpg" alt="Bote de proteína deportiva con cuchara medidora" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
          <div className="hero-gradient" />
          <p className="image-note"><span>01</span> COMBUSTIBLE PARA TU PROGRESO</p>
          <div className="availability"><span /> DISPONIBLE</div>
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow dark"><span /> NUESTRO CATÁLOGO</p>
            <h2>Lo que necesitás.<br /><i>Sin complicaciones.</i></h2>
          </div>
          <p className="catalog-note">Precios de referencia en lempiras. Consultá disponibilidad y sabores.</p>
        </div>

        <div className="filter-bar" role="group" aria-label="Filtrar productos">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'active' : ''}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
          <span>{filteredProducts.length.toString().padStart(2, '0')} productos</span>
        </div>

        <div className="product-grid" aria-live="polite">
          {filteredProducts.map((product, index) => (
            <article className={`product-card ${product.tone}`} key={product.name}>
              <div className="card-top">
                <span className="product-number">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="product-badge">{product.badge}</span>
              </div>
              <button className="product-visual" type="button" onClick={() => chooseProduct(product.name)} aria-label={`Consultar ${product.name}`}>
                <span className="product-shadow" />
                <span className="product-tub"><span>ELITE</span><small>{product.category}</small></span>
              </button>
              <p>{product.note}</p>
              <h3>{product.name}</h3>
              <span className="size">{product.size}</span>
              <div className="product-footer">
                <b>{product.price}</b>
                <button type="button" onClick={() => chooseProduct(product.name)}>Consultar <span>↗</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="goals" id="objetivos">
        <div className="goals-heading">
          <p className="eyebrow"><span /> ELEGÍ SEGÚN TU META</p>
          <h2>No comprés por moda.<br /><strong>Comprá para tu objetivo.</strong></h2>
        </div>
        <div className="goal-list">
          {goals.map((goal) => (
            <button key={goal.number} type="button" onClick={() => chooseGoal(goal.filter)}>
              <span>{goal.number}</span>
              <h3>{goal.title}</h3>
              <p>{goal.copy}</p>
              <i>→</i>
            </button>
          ))}
        </div>
      </section>

      <section className="about" id="nosotros">
        <div className="about-quote">
          <p className="eyebrow dark"><span /> POR QUÉ ELITE</p>
          <blockquote>“No vendemos promesas. Te ayudamos a elegir lo que <em>sí tiene sentido</em> para tu meta.”</blockquote>
        </div>
        <div className="buying-steps">
          <h2>Comprar es simple</h2>
          <ol>
            <li><span>01</span><div><b>Elegí</b><p>Revisá el catálogo y encontrá lo que buscás.</p></div></li>
            <li><span>02</span><div><b>Consultá</b><p>Escribinos para confirmar stock, sabor y entrega.</p></div></li>
            <li><span>03</span><div><b>Recibí</b><p>Coordinamos tu envío en Honduras.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow"><span /> HABLEMOS</p>
          <h2>¿Listo para dar<br /><strong>el siguiente paso?</strong></h2>
          <p>Seleccioná el producto y prepará tu consulta. Te ayudamos con sabores, disponibilidad y entrega.</p>
        </div>
        <div className="inquiry-card">
          <label htmlFor="product-select">Producto de interés</label>
          <select id="product-select" value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)}>
            {products.map((product) => <option key={product.name}>{product.name}</option>)}
          </select>
          <div className="message-preview">
            <span>Tu mensaje</span>
            <p>Hola Elite Performance Nutrition, me interesa <b>{selectedProduct}</b>. ¿Me ayudan con disponibilidad, sabores y entrega?</p>
          </div>
          <a className="button inquiry-button" href={`https://wa.me/?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
            Preparar en WhatsApp <span>↗</span>
          </a>
          <small>Antes de lanzar, conectaremos aquí el número oficial del negocio.</small>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow dark"><span /> PREGUNTAS FRECUENTES</p>
          <h2 id="faq-title">Lo esencial,<br />antes de comprar.</h2>
        </div>
        <div className="faq-list">
          <details><summary>¿Los productos son originales?<span>+</span></summary><p>Sí. Trabajamos con producto sellado y de proveedores confiables. Consultá por la marca y presentación disponible.</p></details>
          <details><summary>¿Hacen envíos fuera de Tegucigalpa?<span>+</span></summary><p>Sí, coordinamos envíos nacionales. El costo y tiempo dependen de tu ciudad y del método de entrega.</p></details>
          <details><summary>¿Me pueden ayudar a elegir?<span>+</span></summary><p>Claro. Contanos tu objetivo, experiencia y rutina para orientarte entre las opciones disponibles.</p></details>
          <details><summary>¿Los precios pueden cambiar?<span>+</span></summary><p>El catálogo muestra precios de referencia. Confirmamos el precio final y disponibilidad antes de coordinar tu pedido.</p></details>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio" aria-label="Elite Performance Nutrition, inicio">
          <span className="brand-logo"><Image src="/elite-logo.png" alt="" width={46} height={46} /></span>
          <span>ELITE PERFORMANCE <em>NUTRITION</em></span>
        </a>
        <p>Suplementos para entrenar, rendir y recuperarte.</p>
        <div><a href="#catalogo">Catálogo</a><a href="#contacto">Contacto</a><a href="#inicio">Volver arriba ↑</a></div>
        <small>© 2026 Elite Performance Nutrition · Honduras</small>
      </footer>

      <a className="floating-inquiry" href="#contacto" aria-label="Ir a consultas">Consultar <span>↗</span></a>
    </main>
  );
}

