'use strict';


function aspectRatio() {
    return window.innerWidth / window.innerHeight;
}

class IntroDesktop {
    init(time) {
        this.animationTime = time;

        this.createIntro();
        this.defineHeader('main-header');

        this.showIntro();
    }

    createIntro() {
        document.body.classList.add('body-intro');
        this.intro = document.createElement('div');
        this.intro.classList.add('intro');

        this.skipIntro = document.createElement('button');
        this.skipIntro.classList.add('skip-intro', 'button-text');
        this.skipIntro.innerText = 'skip intro';

        document.body.prepend(this.skipIntro);
        document.body.prepend(this.intro);
    }

    defineHeader(headerClass) {
        this.header = document.getElementsByClassName(headerClass)[0];
    }

    showIntro() {
        this.skipIntro.addEventListener('click', () => {
            this.finishAnimation(true);
        });

        let i = 1;

        setTimeout(() => {
            this.intro.classList.add('show');
        }, this.animationTime * i);
        i++;

        setTimeout(() => {
            this.intro.classList.add('intro--shrinked');
        }, this.animationTime * i);
        i++;

        setTimeout(() => {
            this.intro.classList.add('intro--visible');
            this.intro.classList.add('intro__before--visible');
            this.intro.classList.add('intro__after--visible');
        }, this.animationTime * i);
        i++;

        setTimeout(() => {
            this.intro.classList.add('intro--expanded');
            this.intro.classList.add('intro__before--expanded');
            this.intro.classList.add('intro__after--expanded');
            this.intro.classList.remove('intro--shrinked');
            this.intro.classList.remove('intro--visible');
            this.intro.classList.remove('intro__after--visible');
        }, this.animationTime * i);
        i+= 2;

        setTimeout(() => {
            this.intro.classList.add('intro__after--expanded-hide');
        }, this.animationTime * i);
        i++;

        setTimeout(() => {
            this.intro.classList.remove('intro__after--expanded-hide');
            this.intro.classList.remove('intro__after--expanded');
        }, this.animationTime * i);
        i++;

        setTimeout(() => {
            this.intro.classList.add('intro__after--clickme');
            this.skipIntro.classList.add('skip-intro--hide')
        }, this.animationTime * i);
        i += 2;

        setTimeout(() => {
            this.skipIntro.remove();
        }, this.animationTime * i);
        i += 3;

        const clickmeTimeout = setTimeout(() => {
            this.intro.classList.add('intro__before--clickme');
        }, this.animationTime * i);

        document.querySelectorAll('.intro')[0].addEventListener('click', () => {
            clearTimeout(clickmeTimeout);
            this.intro.classList.remove('intro__before--clickme');

            setTimeout(() => {
                this.intro.classList.add('intro--fullscreen');
                this.intro.classList.add('intro__before--fullscreen');
            }, 0);

            this.finishAnimation();
        });
    }

    finishAnimation(skipped = false) {
        if (skipped) {
            this.animationTime = 0;
            this.skipIntro.remove();
        }

        setTimeout(() => {
            this.header.classList.remove('header--none');
            this.header.classList.add('header--full');
            this.intro.remove();
        }, this.animationTime * 2);

        setTimeout(() => {
            this.header.classList.remove('header--full');
            document.querySelectorAll('#intro-script')[0].remove();
            document.body.removeAttribute('class');
            this.header.classList.remove('absolute');
        }, this.animationTime * 4);
    }
}

class IntroMobile {
    init(time) {
        this.animationTime = time;

        this.defineHeader('main-header');

        this.showIntro();
    }

    defineHeader(headerClass) {
        this.header = document.getElementsByClassName(headerClass)[0];
        this.header.classList.remove('header--none');
        this.header.classList.remove('absolute');
        this.header.classList.add('header--full');
    }

    showIntro() {
        let i = 1.5;

        setTimeout(() => {
            this.header.classList.remove('header--full');
            this.header.classList.add('header--mobile');
            document.querySelectorAll('#intro-script')[0].remove();
        }, this.animationTime * i);
    }
}

if (aspectRatio() >= 1) {
    let introDesktop = new IntroDesktop();
    introDesktop.init(500);
} else {
    let introMobile = new IntroMobile();
    introMobile.init(500);

}
