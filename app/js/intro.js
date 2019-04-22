'use strict';

class Intro {
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
            // this.skipIntro.classList.add('skip-intro--hide')
        }, this.animationTime * i);
        i += 2;

        setTimeout(() => {
            // this.skipIntro.remove();
        }, this.animationTime * i);
        i += 3;

        setTimeout(() => {
            this.intro.classList.add('intro__before--clickme');
        }, this.animationTime * i);

        document.querySelectorAll('.intro')[0].addEventListener('click', () => {
            this.intro.classList.remove('intro__before--clickme');

            setTimeout(() => {
                this.intro.classList.add('intro--fullscreen');
                this.intro.classList.add('intro__before--fullscreen');
            }, 0);
        })
    }
}

let intro = new Intro();
intro.init(500);