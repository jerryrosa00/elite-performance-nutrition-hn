'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const categories = ['Todos', 'Proteínas', 'Pre-entreno', 'Vitaminas y suplementos', 'Control de peso'] as const;
type Category = (typeof categories)[number];

const products = [
  {
    "name": "Proteina 1 Rule Normal",
    "category": "Proteínas",
    "size": "2 Lbs.",
    "price": "L 1,600",
    "tone": "lime",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Proteina 1 Rule Normal",
    "category": "Proteínas",
    "size": "5 Lbs.",
    "price": "L 3,000",
    "tone": "violet",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Proteina Nutrex",
    "category": "Proteínas",
    "size": "5 Lbs.",
    "price": "L 2,800",
    "tone": "orange",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Proteina Body Fortress",
    "category": "Proteínas",
    "size": "6 Lbs.",
    "price": "L 3,000",
    "tone": "blue",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Proteina 1 Rule Isolatada",
    "category": "Proteínas",
    "size": "2 Lbs.",
    "price": "L 1,800",
    "tone": "sand",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Proteina 1 Rule Vegetal",
    "category": "Proteínas",
    "size": "2 Lbs.",
    "price": "L 1,800",
    "tone": "pink",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Proteina gold standard Mass Gainer",
    "category": "Proteínas",
    "size": "6 Lbs.",
    "price": "L 2,800",
    "tone": "aqua",
    "note": "Proteínas",
    "badge": "Consultar stock"
  },
  {
    "name": "Pre Entreno C4 Ripedd",
    "category": "Pre-entreno",
    "size": "30 Servi.",
    "price": "L 1,200",
    "tone": "yellow",
    "note": "Pre-entreno",
    "badge": "Consultar stock"
  },
  {
    "name": "Pre Entreno AMPED 300 MG-Cafeina",
    "category": "Pre-entreno",
    "size": "20 Servi.",
    "price": "L 1,300",
    "tone": "lime",
    "note": "Pre-entreno",
    "badge": "Consultar stock"
  },
  {
    "name": "Creatina Mh Nutrex",
    "category": "Vitaminas y suplementos",
    "size": "30 Servi.",
    "price": "L 750",
    "tone": "violet",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Creatina Mh Muscletech 400g",
    "category": "Vitaminas y suplementos",
    "size": "80 Servi.",
    "price": "L 1,200",
    "tone": "orange",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Colageno 1 Rule",
    "category": "Vitaminas y suplementos",
    "size": "20 Servi.",
    "price": "L 1,100",
    "tone": "blue",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Magnecio Citrato Now",
    "category": "Vitaminas y suplementos",
    "size": "120 Softgel.",
    "price": "L 800",
    "tone": "sand",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Zinc Gluconato Now",
    "category": "Vitaminas y suplementos",
    "size": "250 Table.",
    "price": "L 600",
    "tone": "pink",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Omega 3 Now",
    "category": "Vitaminas y suplementos",
    "size": "100 Softgel.",
    "price": "L 600",
    "tone": "aqua",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Multi Vitaminas Opti Men",
    "category": "Vitaminas y suplementos",
    "size": "90 Table.",
    "price": "L 1,100",
    "tone": "yellow",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Multi Vitaminas Opti Women",
    "category": "Vitaminas y suplementos",
    "size": "60 Table.",
    "price": "L 900",
    "tone": "lime",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "Amino Energized",
    "category": "Vitaminas y suplementos",
    "size": "30 Servi.",
    "price": "L 900",
    "tone": "violet",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock"
  },
  {
    "name": "L- Carnitina Nutrex",
    "category": "Control de peso",
    "size": "31 Servi.",
    "price": "L 800",
    "tone": "orange",
    "note": "Control de peso",
    "badge": "Consultar stock"
  },
  {
    "name": "Lipo black 6 Nutrex",
    "category": "Control de peso",
    "size": "60 Softgel.",
    "price": "L 1,000",
    "tone": "blue",
    "note": "Control de peso",
    "badge": "Consultar stock"
  },
  {
    "name": "CLA Nutrex",
    "category": "Control de peso",
    "size": "90 Softgel.",
    "price": "L 700",
    "tone": "sand",
    "note": "Control de peso",
    "badge": "Consultar stock"
  }
];

const productLabel = (product: (typeof products)[number]) => `${product.name} — ${product.size}`;

const goals = [
  { number: '01', title: 'Ganar masa', copy: 'Proteínas y creatina para acompañar tu plan de fuerza.', filter: 'Proteínas' as Category },
  { number: '02', title: 'Rendir más', copy: 'Energía, enfoque y soporte para cada repetición.', filter: 'Pre-entreno' as Category },
  { number: '03', title: 'Recuperarte', copy: 'Esenciales diarios para descanso y bienestar.', filter: 'Vitaminas y suplementos' as Category },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [selectedProduct, setSelectedProduct] = useState(productLabel(products[0]));

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
          <span className="brand-logo"><Image src={`${assetBasePath}/elite-logo.png`} alt="" width={46} height={46} /></span>
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
          <Image src={`${assetBasePath}/hero-protein.jpg`} alt="Bote de proteína deportiva con cuchara medidora" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
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
          <p className="catalog-note">Precios en lempiras (HNL). Consultá disponibilidad y sabores.</p>
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
            <article className={`product-card ${product.tone}`} key={productLabel(product)}>
              <div className="card-top">
                <span className="product-number">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="product-badge">{product.badge}</span>
              </div>
              <button className="product-visual" type="button" onClick={() => chooseProduct(productLabel(product))} aria-label={`Consultar ${productLabel(product)}`}>
                <span className="product-shadow" />
                <span className="product-tub"><span>ELITE</span><small>{product.size}</small></span>
              </button>
              <p>{product.note}</p>
              <h3>{product.name}</h3>
              <span className="size">{product.size}</span>
              <div className="product-footer">
                <b>{product.price}</b>
                <button type="button" onClick={() => chooseProduct(productLabel(product))}>Consultar <span>↗</span></button>
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
            {products.map((product) => <option key={productLabel(product)} value={productLabel(product)}>{productLabel(product)}</option>)}
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
          <span className="brand-logo"><Image src={`${assetBasePath}/elite-logo.png`} alt="" width={46} height={46} /></span>
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
