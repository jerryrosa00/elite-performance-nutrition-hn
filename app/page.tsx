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
    "badge": "Consultar stock",
    "image": "/products/product-01.webp",
    "imageAlt": "Foto de referencia de Proteina 1 Rule Normal",
    "imageNote": null
  },
  {
    "name": "Proteina 1 Rule Normal",
    "category": "Proteínas",
    "size": "5 Lbs.",
    "price": "L 3,000",
    "tone": "violet",
    "note": "Proteínas",
    "badge": "Consultar stock",
    "image": "/products/product-02.webp",
    "imageAlt": "Foto de referencia de Proteina 1 Rule Normal",
    "imageNote": null
  },
  {
    "name": "Proteina Nutrex",
    "category": "Proteínas",
    "size": "5 Lbs.",
    "price": "L 2,800",
    "tone": "orange",
    "note": "Proteínas",
    "badge": "Consultar stock",
    "image": "/products/product-03.webp",
    "imageAlt": "Foto de referencia de Proteina Nutrex",
    "imageNote": null
  },
  {
    "name": "Proteina Body Fortress",
    "category": "Proteínas",
    "size": "6 Lbs.",
    "price": "L 3,000",
    "tone": "blue",
    "note": "Proteínas",
    "badge": "Consultar stock",
    "image": "/products/product-04.webp",
    "imageAlt": "Foto de referencia de Proteina Body Fortress",
    "imageNote": "Foto: envase de 1.78 lb. Consulte la presentación de 6 lb."
  },
  {
    "name": "Proteina 1 Rule Isolatada",
    "category": "Proteínas",
    "size": "2 Lbs.",
    "price": "L 1,800",
    "tone": "sand",
    "note": "Proteínas",
    "badge": "Consultar stock",
    "image": "/products/product-05.webp",
    "imageAlt": "Foto de referencia de Proteina 1 Rule Isolatada",
    "imageNote": null
  },
  {
    "name": "Proteina 1 Rule Vegetal",
    "category": "Proteínas",
    "size": "2 Lbs.",
    "price": "L 1,800",
    "tone": "pink",
    "note": "Proteínas",
    "badge": "Consultar stock",
    "image": "/products/product-06.webp",
    "imageAlt": "Foto de referencia de Proteina 1 Rule Vegetal",
    "imageNote": "Foto: envase de 1.48 lb. Confirme la presentación disponible."
  },
  {
    "name": "Proteina gold standard Mass Gainer",
    "category": "Proteínas",
    "size": "6 Lbs.",
    "price": "L 2,800",
    "tone": "aqua",
    "note": "Proteínas",
    "badge": "Consultar stock",
    "image": "/products/product-07.webp",
    "imageAlt": "Foto de referencia de Proteina gold standard Mass Gainer",
    "imageNote": "Foto: envase de 5 lb. Confirme el modelo y la presentación de 6 lb."
  },
  {
    "name": "Pre Entreno C4 Ripedd",
    "category": "Pre-entreno",
    "size": "30 Servi.",
    "price": "L 1,200",
    "tone": "yellow",
    "note": "Pre-entreno",
    "badge": "Consultar stock",
    "image": "/products/product-08.webp",
    "imageAlt": "Foto de referencia de Pre Entreno C4 Ripedd",
    "imageNote": null
  },
  {
    "name": "Pre Entreno AMPED 300 MG-Cafeina",
    "category": "Pre-entreno",
    "size": "20 Servi.",
    "price": "L 1,300",
    "tone": "lime",
    "note": "Pre-entreno",
    "badge": "Consultar stock",
    "image": "/products/product-09.webp",
    "imageAlt": "Foto de referencia de Pre Entreno AMPED 300 MG-Cafeina",
    "imageNote": null
  },
  {
    "name": "Creatina Mh Nutrex",
    "category": "Vitaminas y suplementos",
    "size": "30 Servi.",
    "price": "L 750",
    "tone": "violet",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-10.webp",
    "imageAlt": "Foto de referencia de Creatina Mh Nutrex",
    "imageNote": null
  },
  {
    "name": "Creatina Mh Muscletech 400g",
    "category": "Vitaminas y suplementos",
    "size": "80 Servi.",
    "price": "L 1,200",
    "tone": "orange",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-11.webp",
    "imageAlt": "Foto de referencia de Creatina Mh Muscletech 400g",
    "imageNote": null
  },
  {
    "name": "Colageno 1 Rule",
    "category": "Vitaminas y suplementos",
    "size": "20 Servi.",
    "price": "L 1,100",
    "tone": "blue",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-12.webp",
    "imageAlt": "Foto de referencia de Colageno 1 Rule",
    "imageNote": null
  },
  {
    "name": "Magnecio Citrato Now",
    "category": "Vitaminas y suplementos",
    "size": "120 Softgel.",
    "price": "L 800",
    "tone": "sand",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-13.webp",
    "imageAlt": "Foto de referencia de Magnecio Citrato Now",
    "imageNote": "Foto: 90 cápsulas blandas. Confirme la presentación de 120."
  },
  {
    "name": "Zinc Gluconato Now",
    "category": "Vitaminas y suplementos",
    "size": "250 Table.",
    "price": "L 600",
    "tone": "pink",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-14.webp",
    "imageAlt": "Foto de referencia de Zinc Gluconato Now",
    "imageNote": null
  },
  {
    "name": "Omega 3 Now",
    "category": "Vitaminas y suplementos",
    "size": "100 Softgel.",
    "price": "L 600",
    "tone": "aqua",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-15.webp",
    "imageAlt": "Foto de referencia de Omega 3 Now",
    "imageNote": null
  },
  {
    "name": "Multi Vitaminas Opti Men",
    "category": "Vitaminas y suplementos",
    "size": "90 Table.",
    "price": "L 1,100",
    "tone": "yellow",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-16.webp",
    "imageAlt": "Foto de referencia de Multi Vitaminas Opti Men",
    "imageNote": null
  },
  {
    "name": "Multi Vitaminas Opti Women",
    "category": "Vitaminas y suplementos",
    "size": "60 Table.",
    "price": "L 900",
    "tone": "lime",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-17.webp",
    "imageAlt": "Foto de referencia de Multi Vitaminas Opti Women",
    "imageNote": "Foto: 60 cápsulas. Confirme la presentación disponible."
  },
  {
    "name": "Amino Energized",
    "category": "Vitaminas y suplementos",
    "size": "30 Servi.",
    "price": "L 900",
    "tone": "violet",
    "note": "Vitaminas y suplementos",
    "badge": "Consultar stock",
    "image": "/products/product-18.webp",
    "imageAlt": "Foto de referencia de Amino Energized",
    "imageNote": "Foto de referencia: Rule 1 Energized Amino."
  },
  {
    "name": "L- Carnitina Nutrex",
    "category": "Control de peso",
    "size": "31 Servi.",
    "price": "L 800",
    "tone": "orange",
    "note": "Control de peso",
    "badge": "Consultar stock",
    "image": "/products/product-19.webp",
    "imageAlt": "Foto de referencia de L- Carnitina Nutrex",
    "imageNote": null
  },
  {
    "name": "Lipo black 6 Nutrex",
    "category": "Control de peso",
    "size": "60 Softgel.",
    "price": "L 1,000",
    "tone": "blue",
    "note": "Control de peso",
    "badge": "Consultar stock",
    "image": "/products/product-20.webp",
    "imageAlt": "Foto de referencia de Lipo black 6 Nutrex",
    "imageNote": null
  },
  {
    "name": "CLA Nutrex",
    "category": "Control de peso",
    "size": "90 Softgel.",
    "price": "L 700",
    "tone": "sand",
    "note": "Control de peso",
    "badge": "Consultar stock",
    "image": "/products/product-21.webp",
    "imageAlt": "Foto de referencia de CLA Nutrex",
    "imageNote": null
  }
];

const productLabel = (product: (typeof products)[number]) => `${product.name} — ${product.size}`;
const productImageUrl = (product: (typeof products)[number]) => `https://jerryrosa00.github.io/elite-performance-nutrition-hn${product.image}`;
const consultationCategories = categories.filter((category) => category !== 'Todos');

const goals = [
  { number: '01', title: 'Ganar masa', copy: 'Proteínas y creatina para acompañar tu plan de fuerza.', filter: 'Proteínas' as Category },
  { number: '02', title: 'Rendir más', copy: 'Energía, enfoque y soporte para cada repetición.', filter: 'Pre-entreno' as Category },
  { number: '03', title: 'Recuperarte', copy: 'Esenciales diarios para descanso y bienestar.', filter: 'Vitaminas y suplementos' as Category },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [selectedConsultationCategory, setSelectedConsultationCategory] = useState('Proteínas');
  const [selectedProductName, setSelectedProductName] = useState(products[0].name);
  const [selectedSize, setSelectedSize] = useState(products[0].size);

  const filteredProducts = useMemo(
    () => activeCategory === 'Todos' ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const consultationProducts = useMemo(
    () => products.filter((product) => product.category === selectedConsultationCategory),
    [selectedConsultationCategory],
  );

  const consultationProductNames = useMemo(
    () => [...new Set(consultationProducts.map((product) => product.name))],
    [consultationProducts],
  );

  const consultationSizes = useMemo(
    () => consultationProducts
      .filter((product) => product.name === selectedProductName)
      .map((product) => product.size),
    [consultationProducts, selectedProductName],
  );

  const selectedProduct = consultationProducts.find(
    (product) => product.name === selectedProductName && product.size === selectedSize,
  ) ?? consultationProducts[0];

  const updateConsultationCategory = (category: string) => {
    const productsInCategory = products.filter((product) => product.category === category);
    setSelectedConsultationCategory(category);
    setSelectedProductName(productsInCategory[0].name);
    setSelectedSize(productsInCategory[0].size);
  };

  const updateConsultationProduct = (name: string) => {
    const product = consultationProducts.find((item) => item.name === name);
    setSelectedProductName(name);
    setSelectedSize(product?.size ?? '');
  };

  const chooseProduct = (product: (typeof products)[number]) => {
    setSelectedConsultationCategory(product.category);
    setSelectedProductName(product.name);
    setSelectedSize(product.size);
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const chooseGoal = (filter: Category) => {
    setActiveCategory(filter);
    document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Elite Performance Nutrition, me interesa ${productLabel(selectedProduct)}. ¿Podrían ayudarme con disponibilidad, sabores y entrega?\n\nImagen del producto: ${productImageUrl(selectedProduct)}`,
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Elite Performance Nutrition, inicio">
          <span className="brand-logo"><Image src={`${assetBasePath}/elite-logo-transparent-small.png`} alt="" width={46} height={46} /></span>
          <span>ELITE PERFORMANCE <em>NUTRITION</em></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#catalogo">Productos</a>
          <a href="#objetivos">Objetivos</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <a className="button button-small" href="#contacto">Consultar</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> SUPLEMENTOS ORIGINALES · HONDURAS</p>
          <h1>Eleve su<br />rendimiento.<br /><strong>Sin límites.</strong></h1>
          <p className="hero-description">
            Proteína, creatina y productos esenciales seleccionados para que entrene con intención y se recupere mejor.
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

        <div className="hero-visual" aria-label="Atleta entrenando con pesas">
          <Image src={`${assetBasePath}/hero-athlete.jpg`} alt="Atleta entrenando con mancuernas y el logo Elite en su camiseta" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
          <div className="hero-gradient" />
          <p className="image-note"><span>01</span> COMBUSTIBLE PARA TU PROGRESO</p>
          <div className="availability"><span /> DISPONIBLE</div>
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow dark"><span /> NUESTRO CATÁLOGO</p>
            <h2>Lo que necesitas.<br /><i>Sin complicaciones.</i></h2>
          </div>
          <p className="catalog-note">Precios en lempiras (HNL). Consulte disponibilidad y sabores. Las fotografías son de referencia; el sabor y el empaque pueden variar.</p>
        </div>

        <div className="filter-bar" role="group" aria-label="Filtrar productos">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'active' : ''}
              key={category}
              aria-pressed={activeCategory === category}
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
              <button className="product-visual" type="button" onClick={() => chooseProduct(product)} aria-label={`Consultar ${productLabel(product)}`}>
                <Image
                  className="product-photo"
                  src={`${assetBasePath}${product.image}`}
                  alt={product.imageAlt}
                  width={800}
                  height={800}
                  sizes="(max-width: 600px) calc(100vw - 80px), (max-width: 1050px) 42vw, 20vw"
                />
                <span className="product-hover-hint">Vista previa</span>
              </button>
              <div className="product-photo-note">{product.imageNote}</div>
              <p>{product.note}</p>
              <h3>{product.name}</h3>
              <span className="size">{product.size}</span>
              <div className="product-footer">
                <b>{product.price}</b>
                <button type="button" onClick={() => chooseProduct(product)}>Consultar <span>↗</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="goals" id="objetivos">
        <div className="goals-heading">
          <p className="eyebrow"><span /> ELIJA SEGÚN SU META</p>
          <h2>No compre por moda.<br /><strong>Compre para su objetivo.</strong></h2>
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
          <blockquote>“No vendemos promesas. Te ayudamos a elegir lo que <em>sí tiene sentido</em> para tu objetivo.”</blockquote>
        </div>
        <div className="buying-steps">
          <h2>Comprar es simple</h2>
          <ol>
            <li><span>01</span><div><b>Elija</b><p>Revise el catálogo y encuentre lo que busca.</p></div></li>
            <li><span>02</span><div><b>Consulte</b><p>Escríbanos para confirmar existencias, sabor y entrega.</p></div></li>
            <li><span>03</span><div><b>Reciba</b><p>Coordinamos su envío en Honduras.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow"><span /> HABLEMOS</p>
          <h2>Listo para dar<br /><strong>el siguiente paso.</strong></h2>
          <p>Seleccione el producto y prepare su consulta. Le ayudamos con sabores, disponibilidad y entrega.</p>
        </div>
        <div className="inquiry-card">
          <div className="inquiry-fields">
            <div>
              <label htmlFor="category-select">Tipo de producto</label>
              <select id="category-select" value={selectedConsultationCategory} onChange={(event) => updateConsultationCategory(event.target.value)}>
                {consultationCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="product-select">Producto</label>
              <select id="product-select" value={selectedProductName} onChange={(event) => updateConsultationProduct(event.target.value)}>
                {consultationProductNames.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="size-select">Tamaño / presentación</label>
              <select id="size-select" value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
                {consultationSizes.map((size) => <option key={size} value={size}>{size}</option>)}
              </select>
            </div>
          </div>
          <div className="consultation-product-preview">
            <Image src={`${assetBasePath}${selectedProduct.image}`} alt={selectedProduct.imageAlt} width={120} height={120} sizes="120px" />
            <div><span>Producto seleccionado</span><b>{productLabel(selectedProduct)}</b></div>
          </div>
          <div className="message-preview">
            <span>Tu mensaje</span>
            <p>Hola Elite Performance Nutrition, me interesa <b>{productLabel(selectedProduct)}</b>. ¿Podrían ayudarme con disponibilidad, sabores y entrega? La imagen del producto se incluirá en el mensaje.</p>
          </div>
          <a className="button inquiry-button" href={`https://wa.me/50488203576?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
            Enviar por WhatsApp <span>↗</span>
          </a>
          <small>WhatsApp: +504 8820-3576</small>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow dark"><span /> PREGUNTAS FRECUENTES</p>
          <h2 id="faq-title">Lo esencial,<br />antes de comprar.</h2>
        </div>
        <div className="faq-list">
          <details><summary>¿Los productos son originales?<span>+</span></summary><p>Sí. Trabajamos con productos sellados y proveedores confiables. Consulte por la marca y la presentación disponible.</p></details>
          <details><summary>¿Realizan envíos a otras ciudades?<span>+</span></summary><p>Sí, podemos realizar envíos a otras ciudades. El costo y tiempo dependen de su ubicación y del método de entrega.</p></details>
          <details><summary>¿Pueden ayudarme a elegir?<span>+</span></summary><p>Con gusto. Indíquenos su objetivo, experiencia y rutina para orientarle entre las opciones disponibles.</p></details>
          <details><summary>¿Los precios pueden cambiar?<span>+</span></summary><p>El catálogo muestra precios de referencia. Confirmamos el precio final y disponibilidad antes de coordinar tu pedido.</p></details>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio" aria-label="Elite Performance Nutrition, inicio">
          <span className="brand-logo"><Image src={`${assetBasePath}/elite-logo-transparent-small.png`} alt="" width={46} height={46} /></span>
          <span>ELITE PERFORMANCE <em>NUTRITION</em></span>
        </a>
        <p>Suplementos para entrenar, rendir y recuperarse.</p>
        <div><a href="#catalogo">Catálogo</a><a href="#contacto">Contacto</a><a href="https://www.instagram.com/elite.nutritionhn/" target="_blank" rel="noreferrer">Instagram @elite.nutritionhn</a><a href="#inicio">Volver arriba ↑</a></div>
        <small>© 2026 Elite Performance Nutrition · Honduras</small>
      </footer>

      <a className="floating-inquiry" href="#contacto" aria-label="Ir a consultas">Consultar <span>↗</span></a>
    </main>
  );
}
