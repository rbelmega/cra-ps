import type { Metadata, Viewport } from "next";
import Image from "next/image";

import appIcon from "../../../../public/traffic-rules/app-icon.webp";

import { MotionEffects } from "./MotionEffects";
import styles from "./page.module.scss";

const canonicalUrl = "https://www.belmeha.com/traffic-rules";
const appStoreUrl = "https://apps.apple.com/ua/app/id6758890398";
const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.belmeha.pdr";
const socialPreviewUrl = `${canonicalUrl}/social-preview.webp`;
const supportEmail = "belmega31@gmail.com";
const supportMailto = "mailto:belmega31@gmail.com?subject=ПДР%20України%20—%20Support";

const features = [
	{
		number: "01",
		title: "ПДР України",
		body: "Зручна навігація всіма розділами правил — від загальних положень до безпеки руху.",
	},
	{
		number: "02",
		title: "Дорожні знаки",
		body: "Категорії, зображення та пояснення, щоб швидко знайти потрібний знак.",
	},
	{
		number: "03",
		title: "Дорожня розмітка",
		body: "Горизонтальна й вертикальна розмітка з наочними ілюстраціями та описами.",
	},
	{
		number: "04",
		title: "Сигнали регулювальника",
		body: "Зрозумілі схеми жестів, підказки для водіїв і пішоходів та офіційний текст ПДР.",
	},
	{
		number: "05",
		title: "Локальний пошук",
		body: "Шукайте правила, знаки, розмітку й сигнали за номером або ключовими словами.",
	},
	{
		number: "06",
		title: "Завжди доступно",
		body: "Основний довідковий вміст зберігається в застосунку й доступний без акаунта.",
	},
];

const showcaseItems = [
	{
		src: "/traffic-rules/signs.webp",
		alt: "Категорії дорожніх знаків у застосунку ПДР України",
		label: "Знаки за категоріями",
		theme: "light",
	},
	{
		src: "/traffic-rules/search.webp",
		alt: "Результати пошуку за правилами дорожнього руху",
		label: "Пошук з будь-якого екрана",
		theme: "light",
	},
	{
		src: "/traffic-rules/signals.webp",
		alt: "Сигнали регулювальника з наочними схемами",
		label: "Сигнали з наочними схемами",
		theme: "dark",
	},
] as const;

export const metadata: Metadata = {
	title: "ПДР України — правила, знаки й розмітка",
	description:
		"ПДР України, дорожні знаки, розмітка, сигнали регулювальника та локальний пошук в одному застосунку для iOS та Android.",
	alternates: {
		canonical: canonicalUrl,
	},
	openGraph: {
		type: "website",
		locale: "uk_UA",
		title: "ПДР України — правила завжди під рукою",
		description:
			"Зручний довідник із ПДР, дорожніх знаків, розмітки та сигналів регулювальника для iOS та Android.",
		url: canonicalUrl,
		images: [
			{
				url: socialPreviewUrl,
				width: 1024,
				height: 500,
				alt: "ПДР України — правила дорожнього руху в одному застосунку",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "ПДР України — правила завжди під рукою",
		description:
			"ПДР, знаки, розмітка, сигнали регулювальника та пошук в одному застосунку для iOS та Android.",
		images: [socialPreviewUrl],
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#eef8fb" },
		{ media: "(prefers-color-scheme: dark)", color: "#071923" },
	],
};

export default function TrafficRulesMarketingPage() {
	return (
		<div className={styles.page} lang="uk" data-motion-root>
			<MotionEffects />
			<a className={styles.skipLink} href="#main-content">
				Перейти до основного вмісту
			</a>

			<header className={styles.header}>
				<a className={styles.brand} href="/traffic-rules/" aria-label="ПДР України — головна">
					<Image
						className={styles.brandIcon}
						src={appIcon}
						alt=""
						width={48}
						height={48}
						priority
					/>
					<span>
						<strong>ПДР України</strong>
						<small>Правила дорожнього руху</small>
					</span>
				</a>

				<nav aria-label="Навігація сторінкою">
					<a href="#features">Можливості</a>
					<a href="#privacy">Приватність</a>
					<a href="#support">Support</a>
				</nav>
			</header>

			<main id="main-content">
				<section className={styles.hero}>
					<div className={styles.heroCopy}>
						<p className={styles.eyebrow}>ПДР України · 2026</p>
						<h1 aria-label="Правила завжди під рукою.">
							Правила завжди <span>під рукою.</span>
						</h1>
						<p className={styles.heroText}>
							ПДР, дорожні знаки, розмітка й сигнали регулювальника в одному зручному застосунку для
							iOS та Android.
						</p>

						<div className={styles.heroActions}>
							<a
								className={styles.appStoreLink}
								href={appStoreUrl}
								target="_blank"
								rel="noreferrer"
							>
								<Image
									className={styles.appStoreBadge}
									src="/traffic-rules/app-store-badge-uk.svg"
									alt="Завантажити в App Store"
									width={121}
									height={41}
									unoptimized
								/>
							</a>
							<a
								className={styles.googlePlayLink}
								href={googlePlayUrl}
								target="_blank"
								rel="noreferrer"
							>
								<Image
									className={styles.googlePlayBadge}
									src="/traffic-rules/google-play-badge-uk.svg"
									alt="Завантажити в Google Play"
									width={239}
									height={71}
									unoptimized
								/>
							</a>
							<a className={styles.secondaryButton} href="#features">
								Дізнатися більше
							</a>
						</div>

						<ul className={styles.trustList} aria-label="Переваги застосунку">
							<li>Без реклами</li>
							<li>Без акаунта</li>
							<li>Працює офлайн</li>
						</ul>
					</div>

					<div className={styles.heroVisual}>
						<div className={styles.phoneEntrance}>
							<Image
								className={styles.heroScreenshot}
								src="/traffic-rules/home.webp"
								alt="Головний екран застосунку з розділами правил дорожнього руху"
								width={800}
								height={1731}
								sizes="(max-width: 760px) 82vw, 520px"
								priority
							/>
						</div>
					</div>
				</section>

				<section className={styles.featuresSection} id="features">
					<div className={styles.sectionIntro} data-reveal>
						<p className={styles.eyebrow}>Один застосунок</p>
						<h2>Все потрібне водію — в одному місці.</h2>
						<p>
							Від швидкої перевірки знака до повторення цілої теми перед іспитом. Без зайвих екранів
							і залежності від мережі.
						</p>
					</div>

					<div className={styles.featureGrid}>
						{features.map((feature, index) => (
							<article key={feature.number} data-reveal data-reveal-order={(index % 3) + 1}>
								<span>{feature.number}</span>
								<h3>{feature.title}</h3>
								<p>{feature.body}</p>
							</article>
						))}
					</div>
				</section>

				<section className={styles.showcaseSection} id="screenshots">
					<div className={styles.sectionIntro} data-reveal>
						<p className={styles.eyebrow}>Продумано для щоденного користування</p>
						<h2>Знайдіть відповідь за кілька рухів.</h2>
						<p>
							Чітка структура, великий пошук і наочні матеріали допомагають швидко перейти від
							запитання до потрібного пункту.
						</p>
					</div>

					<div className={styles.screenshotGrid}>
						{showcaseItems.map((item, index) => (
							<figure
								className={item.theme === "dark" ? styles.darkShot : undefined}
								key={item.src}
								data-reveal
								data-reveal-order={index + 1}
							>
								<Image
									src={item.src}
									alt={item.alt}
									width={800}
									height={1731}
									sizes="(max-width: 760px) 82vw, 360px"
								/>
								<figcaption>{item.label}</figcaption>
							</figure>
						))}
					</div>
				</section>

				<section className={styles.legalSection} aria-labelledby="legal-title">
					<div className={styles.legalIntro} data-reveal>
						<div>
							<p className={styles.eyebrow}>Privacy & Support</p>
							<h2 id="legal-title">Усе важливе — прямо тут.</h2>
						</div>
						<p>
							Прозорі правила приватності та прямий зв’язок із розробником — без дрібного шрифту й
							зайвих переходів.
						</p>
					</div>

					<div className={styles.legalGrid}>
						<article
							className={`${styles.legalCard} ${styles.privacyCard}`}
							id="privacy"
							data-reveal
							data-reveal-order="1"
						>
							<header className={styles.legalCardHeader}>
								<span>01</span>
								<div>
									<p>Privacy Policy</p>
									<h3>Дані не збираються.</h3>
								</div>
							</header>

							<p className={styles.legalLead}>
								ПДР України не збирає, не зберігає та не передає персональні дані. Для роботи
								застосунку не потрібен обліковий запис.
							</p>

							<dl className={styles.privacyFacts}>
								<div>
									<dt>Облікові записи</dt>
									<dd>Не потрібні</dd>
								</div>
								<div>
									<dt>Збір персональних даних</dt>
									<dd>Відсутній</dd>
								</div>
								<div>
									<dt>Без реклами й аналітики</dt>
									<dd>Без SDK і tracking</dd>
								</div>
								<div>
									<dt>Пошук</dt>
									<dd>Локально на пристрої</dd>
								</div>
							</dl>

							<div className={styles.legalDetails}>
								<div>
									<h4>Як працюють дані</h4>
									<p>
										Правила, знаки, розмітка та сигнали зберігаються в застосунку. Пошук працює з
										цим локальним довідковим вмістом. Рекламні, аналітичні й tracking-сервіси не
										використовуються.
									</p>
								</div>
								<div>
									<h4>Видалення даних</h4>
									<p>
										Видаліть застосунок із пристрою, щоб видалити його локальні дані. Листи до
										підтримки використовуються лише для відповіді на ваше звернення.
									</p>
								</div>
								<div>
									<h4>Діти та зміни політики</h4>
									<p>
										Це загальний довідковий застосунок, який свідомо не збирає інформацію про дітей.
										Якщо робота з даними зміниться, ця політика буде оновлена.
									</p>
								</div>
							</div>

							<footer className={styles.legalMeta}>
								<span>Оновлено: 22 серпня 2026</span>
								<span>Розробник: Rostyslav Belmeha</span>
							</footer>
						</article>

						<article
							className={`${styles.legalCard} ${styles.supportCard}`}
							id="support"
							data-reveal
							data-reveal-order="2"
						>
							<header className={styles.legalCardHeader}>
								<span>02</span>
								<div>
									<p>Support</p>
									<h3>Допомога без ботів.</h3>
								</div>
							</header>

							<p className={styles.legalLead}>
								Питання про застосунок, помилка в матеріалах або проблема з пошуком? Напишіть
								безпосередньо розробнику.
							</p>

							<a className={styles.supportButton} href={supportMailto}>
								<span>Написати в підтримку</span>
								<strong>{supportEmail}</strong>
							</a>

							<div className={styles.supportDetails}>
								<div>
									<h4>Що додати до звернення</h4>
									<ul>
										<li>Модель пристрою та версію iOS або Android.</li>
										<li>Версію застосунку й короткий опис проблеми.</li>
										<li>Розділ ПДР, знак, розмітку або пошуковий запит.</li>
									</ul>
								</div>
								<div>
									<h4>Перед зверненням</h4>
									<ul>
										<li>Перезапустіть застосунок.</li>
										<li>Перевірте, чи достатньо вільного місця на пристрої.</li>
										<li>Додайте скріншот, якщо проблема відтворюється.</li>
									</ul>
								</div>
							</div>

							<p className={styles.supportNote}>
								Звернення використовуються лише для розгляду проблеми та відповіді вам.
							</p>
						</article>
					</div>
				</section>

				<section className={styles.closingSection}>
					<Image src={appIcon} alt="" width={96} height={96} data-reveal data-reveal-order="1" />
					<div data-reveal data-reveal-order="2">
						<p className={styles.eyebrow}>ПДР України</p>
						<h2>Правила, знаки й розмітка — коли вони потрібні.</h2>
					</div>
					<div className={styles.storeActions}>
						<a className={styles.appStoreLink} href={appStoreUrl} target="_blank" rel="noreferrer">
							<Image
								className={styles.appStoreBadge}
								src="/traffic-rules/app-store-badge-uk.svg"
								alt="Завантажити в App Store"
								width={121}
								height={41}
								unoptimized
							/>
						</a>
						<a
							className={styles.googlePlayLink}
							href={googlePlayUrl}
							target="_blank"
							rel="noreferrer"
						>
							<Image
								className={styles.googlePlayBadge}
								src="/traffic-rules/google-play-badge-uk.svg"
								alt="Завантажити в Google Play"
								width={239}
								height={71}
								unoptimized
							/>
						</a>
					</div>
				</section>
			</main>

			<footer className={styles.footer}>
				<div className={styles.footerNotes}>
					<p>© 2026 Rostyslav Belmeha</p>
					<p className={styles.appleCredit}>
						Apple, логотип Apple та iPhone є торговельними марками Apple Inc. App Store є знаком
						обслуговування Apple Inc.
					</p>
					<p className={styles.appleCredit}>
						Google Play та логотип Google Play є торговельними марками Google LLC.
					</p>
				</div>
				<div className={styles.footerLinks}>
					<a href={appStoreUrl} target="_blank" rel="noreferrer">
						App Store
					</a>
					<a href={googlePlayUrl} target="_blank" rel="noreferrer">
						Google Play
					</a>
					<a href="#privacy">Privacy Policy</a>
					<a href="#support">Support</a>
				</div>
			</footer>
		</div>
	);
}
