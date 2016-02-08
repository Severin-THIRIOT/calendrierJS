// revoir le nommage (eng/fre) // revoir les element des style en js pour mettre des classList.add


var Calendrier =  function(idParent){

    //////////////declaration des variables////////////////////////////////////////////////////////////

    this.monthNames = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    //var monthEng =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    this.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //gestion des annnees bissextiles
    this.monthDaysBissextil = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //recupere la date d'aujourd'hui
    this.now = new Date();
    //recupere juste l'année
    this.annee = this.now.getFullYear();
    //variable qui va etre incrementé a chaque changement d'annees
    this.anneeAjout = this.annee;
    //recuperation juste du mois
    this.mois = this.now.getMonth();
    //variable qui va etre incrementé a chaque changement de mois
    this.moisAjout = this.mois;
    //recupere le jour
    this.jour = this.now.getDate();

    this.firstday;
    this.jour1;
    this.moisPrec;
    this.moisSuiv


    ////////////////gestion des données///////////////////////////////////////////////////////////////////

    this.premierJour = function(){
        this.firstday = new Date(this.anneeAjout, this.moisAjout, 1, 1);
        this.jour1 = this.firstday.getDay();
    };
    this.premierJour();


    this.incrementationDesMois = function() {
        if (this.moisAjout === 12) {
            this.moisAjout = 0;
            this.anneeAjout++;
        }
        else if (this.moisAjout === -1){
            this.moisAjout = 11;
            this.anneeAjout--;
        }
    };

    this.moisPrecedent = function(){
        this.moisAjout--;
        this.premierJour();
        this.incrementationDesMois();
        this.affichage();
    };

    this.moisSuivant = function(){
        this.moisAjout ++;
        this.premierJour();
        this.incrementationDesMois();
        this.affichage();
    };

    /////gestion de l'affichage/////////////////////////////////////////////////////////////////////

    this.affichage = function() {

        this.affichageDate = function () {
            document.getElementById(idParent).innerHTML = "";
            var month = document.createElement("h5");
            var contentMonth = document.createElement("p");
            contentMonth.textContent = this.monthNames[this.moisAjout] + " " + this.anneeAjout;
            month.appendChild(contentMonth);
            document.getElementById(idParent).appendChild(month);
        };
        this.affichageDate();

        this.quadrillageCal = function () {
            for (var i = 1; i <= 42; i++) {
                var days = document.createElement("div");
                days.id = i;
                document.getElementById(idParent).appendChild(days);
                days.classList.add("cradreCalendrier");
                days.style.display = "inline-block";
                days.style.width = "13.6%";
                days.textContent = "_";
            }
        };
        this.quadrillageCal();

        this.affichageJours = function () {
            if(this.anneeAjout % 4 !== 0 ) {
                for (var j = 1; j <= this.monthDays[this.moisAjout]; j++) {
                    if (this.jour1 == 0) {
                        this.jour1 = 7;
                    }
                    var jours = document.getElementById(j + this.jour1 - 1);
                    if (this.moisAjout === this.mois && this.anneeAjout === this.annee) {
                        document.getElementById(j + this.jour1 - 1).textContent = j;
                        if (j == this.jour) {
                            jours.style.backgroundColor = "black";
                            jours.style.color = "white";
                        }
                        if (j < this.jour) {
                            jours.style.backgroundColor = "gray";
                        }
                        if (j > this.jour) {
                            jours.textContent = j;
                            jours.classList.add("caseCal");
                        }
                    }
                    else if (this.moisAjout >= this.mois && this.anneeAjout >= this.annee) {
                        jours.textContent = j;
                        jours.classList.add("caseCal");
                    }
                    else if (this.moisAjout < this.mois && this.anneeAjout > this.annee) {
                        jours.textContent = j;
                        jours.classList.add("caseCal");
                    }
                    else if (this.moisAjout < this.mois || this.anneeAjout < this.annee) {
                        jours.textContent = j;
                        jours.style.backgroundColor = "gray";
                    }
                }
            }
            else if(this.anneeAjout % 4 === 0 ) {
                for (var j = 1; j <= this.monthDaysBissextil[this.moisAjout]; j++) {
                    if (this.jour1 == 0) {
                        this.jour1 = 7;
                    }
                    var jours = document.getElementById(j + this.jour1 - 1);
                    if (this.moisAjout === this.mois && this.anneeAjout === this.annee) {
                        document.getElementById(j + this.jour1 - 1).textContent = j;
                        if (j == this.jour) {
                            jours.style.backgroundColor = "black";
                            jours.style.color = "white";
                        }
                        if (j < this.jour) {
                            jours.style.backgroundColor = "gray";
                        }
                        if (j > this.jour) {
                            jours.textContent = j;
                            jours.classList.add("caseCal");
                        }
                    }
                    else if (this.moisAjout >= this.mois && this.anneeAjout >= this.annee) {
                        jours.textContent = j;
                        jours.classList.add("caseCal");
                    }
                    else if (this.moisAjout < this.mois && this.anneeAjout > this.annee) {
                        jours.textContent = j;
                        jours.classList.add("caseCal");
                    }
                    else if (this.moisAjout < this.mois || this.anneeAjout < this.annee) {
                        jours.textContent = j;
                        jours.style.backgroundColor = "gray";
                    }
                }
            }
        };
        this.affichageJours();

        this.boutonPrec = function () {
            this.moisPrec = document.createElement("button");
            this.moisPrec.textContent = "<<";
            this.moisPrec.addEventListener("click", this.moisPrecedent.bind(this));
            this.moisPrec.style.display = "inline-block";
            document.getElementById(idParent).appendChild(this.moisPrec);
        };
        this.boutonPrec();

        this.boutonSuiv = function () {
            this.moisSuiv = document.createElement("button");
            this.moisSuiv.textContent = ">>";
            this.moisSuiv.style.display = "inline-block";
            this.moisSuiv.addEventListener("click", this.moisSuivant.bind(this));
            document.getElementById(idParent).appendChild(this.moisSuiv);
        };
        this.boutonSuiv();
    };
};