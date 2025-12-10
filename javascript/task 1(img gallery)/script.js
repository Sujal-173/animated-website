const gallery = document.getElementById('gallery');

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

const effectSelect = document.getElementById('sel-effect');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentIndex = null;

function filterGallery(category) {
	if (category === 'all') {
		galleryItems.forEach(item => item.style.display = 'block');
		return;
	}

	galleryItems.forEach(item => {
		const itemCategory = (item.dataset.category || '').toLowerCase();
		item.style.display = (itemCategory === category) ? 'block' : 'none';
	});
}

function applyEffect(effectValue) {
	const filterMap = {
		normal: 'none',
		grayscale: 'grayscale(100%)',
		sepia: 'sepia(60%)'
	};

	const cssFilter = filterMap[effectValue] || 'none';

	galleryItems.forEach(item => {
		const img = item.querySelector('img');
		if (img) img.style.filter = cssFilter;
	});
}

function openLightbox(index) {
	if (index == null || index < 0 || index >= galleryItems.length) return;

	currentIndex = index;
	const imgEl = galleryItems[currentIndex].querySelector('img');
	lightboxImg.src = imgEl.src;
	lightboxImg.alt = imgEl.alt || '';

	lightbox.setAttribute('aria-hidden', 'false');
	lightbox.style.display = 'flex';

	document.body.style.overflow = 'hidden';

	lightboxClose.focus();
}

function closeLightbox() {
	lightbox.setAttribute('aria-hidden', 'true');
	lightbox.style.display = 'none';
	lightboxImg.src = '';
	lightboxImg.alt = '';

	document.body.style.overflow = '';

	currentIndex = null;
}

function showNext() {
	const next = (currentIndex + 1) % galleryItems.length;
	openLightbox(next);
}

function showPrev() {
	const prev = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
	openLightbox(prev);
}

galleryItems.forEach(item => {
	const idx = parseInt(item.dataset.index, 10);
	item.addEventListener('click', () => openLightbox(idx));
});

filterButtons.forEach(btn => {
	btn.addEventListener('click', (e) => {
		const filterVal = (e.currentTarget.dataset.filter || 'all').toLowerCase();
		filterGallery(filterVal);
	});
});

effectSelect.addEventListener('change', (e) => {
	const val = e.target.value;
	applyEffect(val);
});

lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);
lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
	if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
	if (lightbox.getAttribute('aria-hidden') === 'false') {
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') showNext();
		if (e.key === 'ArrowLeft') showPrev();
	}
});

applyEffect(effectSelect.value || 'normal');
lightbox.style.display = 'none';

