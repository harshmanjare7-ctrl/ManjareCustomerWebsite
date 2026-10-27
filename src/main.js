import './style.css';

// =============================================
// MANJARE WEBSITE SETTINGS
// =============================================

const SETTINGS = {
    videoPath: '/videos/manjare-drive.mp4',

    // Replace this with your actual business email.
    businessEmail: 'hvmgamer69@gmail.com',

    // Skip the opening seconds if your video starts black.
    videoStartSeconds: 2.5
};


// =============================================
// 1. CINEMATIC VIDEO
// =============================================

const video = document.querySelector('#heroVideo');

if (video) {

    // Set video source from settings if no source is already present.
    if (!video.getAttribute('src')) {
        video.src = SETTINGS.videoPath;
    }

    video.addEventListener(
        'loadedmetadata',
        () => {

            if (
                Number.isFinite(video.duration) &&
                video.duration > SETTINGS.videoStartSeconds + 1
            ) {
                video.currentTime = SETTINGS.videoStartSeconds;
            }

        },
        { once: true }
    );


    video.addEventListener('error', () => {

        console.error(
            `Could not load the video. Check ${SETTINGS.videoPath}`
        );

    });


    // Muted autoplay is supported by most modern browsers.
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');


    const playVideo = () => {

        video.play().catch(() => {

            console.info(
                'Video autoplay was blocked. Check browser autoplay settings.'
            );

        });

    };


    if (video.readyState >= 2) {

        playVideo();

    } else {

        video.addEventListener(
            'canplay',
            playVideo,
            { once: true }
        );

    }

}


// =============================================
// 2. MOBILE NAVIGATION
// =============================================

const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');


function closeMenu() {

    navLinks?.classList.remove('open');

    menuToggle?.setAttribute(
        'aria-expanded',
        'false'
    );

}


menuToggle?.addEventListener('click', () => {

    if (!navLinks) {
        return;
    }

    const isOpen =
        navLinks.classList.toggle('open');

    menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
    );

});


navLinks?.querySelectorAll('a').forEach((link) => {

    link.addEventListener(
        'click',
        closeMenu
    );

});


// =============================================
// 3. SCROLL PROGRESS
// =============================================

const progressBar =
    document.querySelector('#pageProgress');

let scrollTicking = false;


function updateScrollProgress() {

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }


    scrollTicking = false;

}


window.addEventListener(
    'scroll',
    () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                updateScrollProgress
            );

            scrollTicking = true;

        }

    },
    { passive: true }
);


updateScrollProgress();


// =============================================
// 4. REVEAL SECTIONS WHEN SCROLLING
// =============================================

const revealElements =
    document.querySelectorAll('.reveal');


if ('IntersectionObserver' in window) {

    const observer =
        new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'visible'
                        );

                        currentObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -30px 0px'
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add('visible');

    });

}


// =============================================
// 5. FOOTER YEAR
// =============================================

const yearElement =
    document.querySelector('#year');


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// =============================================
// 6. TRIP ENQUIRY
// =============================================

const tripForm =
    document.querySelector('#tripForm');

// Carry the selected catalogue vehicle into the existing trip enquiry form.
if (tripForm) {
    const requestedVehicle = new URLSearchParams(window.location.search).get('vehicle');
    const detailsField = tripForm.querySelector('[name="details"]');

    if (requestedVehicle && detailsField) {
        const vehicleLine = `Preferred vehicle: ${requestedVehicle}`;
        detailsField.value = detailsField.value.trim()
            ? `${vehicleLine}\n${detailsField.value.trim()}`
            : vehicleLine;
    }
}

tripForm?.addEventListener(
    'submit',
    (event) => {

        event.preventDefault();


        if (!tripForm.reportValidity()) {

            return;

        }


        if (
            !SETTINGS.businessEmail ||
            SETTINGS.businessEmail === 'YOUR_EMAIL@example.com'
        ) {

            alert(
                'Please add your business email in src/main.js first.'
            );

            return;

        }


        const formData =
            new FormData(tripForm);


        const name =
            formData.get('name')
                ?.toString()
                .trim() ?? '';


        const phone =
            formData.get('phone')
                ?.toString()
                .trim() ?? '';

        const pickup =
            formData.get('pickup')
                ?.toString()
                .trim() ?? '';


        const destination =
            formData.get('destination')
                ?.toString()
                .trim() ?? '';


        const details =
            formData.get('details')
                ?.toString()
                .trim() ?? '';


        const subject =
            `Trip enquiry from ${name}`;


        const body = [

            'MANJARE TOURS & TRAVELS — TRIP ENQUIRY',

            '',

            `Name: ${name}`,

            `Phone: ${phone}`,
            `Pickup Location: ${pickup}`,
            `Destination: ${destination}`,

            `Trip details: ${
                details || 'Not specified'
            }`

        ].join('\n');


        const mailto =
            `mailto:${SETTINGS.businessEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        window.location.href = mailto;

    }
);