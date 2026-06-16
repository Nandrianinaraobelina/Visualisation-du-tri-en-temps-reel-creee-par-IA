#  Visualisation du Tri en Temps Réel (NATAO T@ AI ity)

LIEN SITE :   https://agent-6a312d641--algorithme-insertion-sort-by-ai.netlify.app/

Une application web interactive permettant de visualiser l'algorithme **Insertion Sort (Tri par Insertion)** étape par étape grâce à des animations en temps réel.

Cette application est idéale pour les étudiants, les débutants en algorithmique ou toute personne souhaitant comprendre visuellement le fonctionnement du tri par insertion.

---

##  Fonctionnalités

*  Génération automatique d'un tableau aléatoire
*  Choix de la taille du tableau
 Réglage de la vitesse d'animation
*  Visualisation des comparaisons et déplacements
* Mise en évidence de la variable `key`
*  Affichage des actions en temps réel
*  Affichage du code source de l'algorithme
*  Interface moderne avec thème sombre
*  Compatible mobile et ordinateur

---

##  Aperçu

<p align="center">
  <img src="sary (1).png" width="45%">
  <img src="sary (2).png" width="45%">
 <img src="sary (3).png" width="45%">
 <img src="sary (4).png" width="45%">
</p>

<p align="center">
  <b>Interface principale</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Visualisation du tri</b>
</p>
---

##  Démonstration

L'application permet de suivre visuellement chaque étape du tri :

1. Sélection de l'élément courant (`key`)
2. Comparaison avec les éléments précédents
3. Décalage des éléments plus grands
4. Insertion de la valeur à sa position correcte
5. Répétition jusqu'au tri complet du tableau

---

##  Technologies utilisées

* HTML5
* CSS3
* JavaScript (Vanilla)

Aucune bibliothèque externe n'est utilisée.

---

##  Complexité de l'algorithme

| Cas            | Complexité |
| -------------- | ---------- |
| Meilleur cas   | O(n)       |
| Cas moyen      | O(n²)      |
| Pire cas       | O(n²)      |
| Espace mémoire | O(1)       |

---

##  Algorithme utilisé

```python
def insertionSort(a):
    n = len(a)

    for i in range(1, n):
        key = a[i]
        j = i

        while j > 0 and a[j - 1] > key:
            a[j] = a[j - 1]
            j -= 1

        a[j] = key
```

---

## ▶️ Comment utiliser l'application

### 1️⃣ Générer un tableau

Choisissez une taille comprise entre :

```text
5 et 15 éléments
```

Puis cliquez sur :

```text
Generate Array
```

### 2️⃣ Régler la vitesse

Utilisez le curseur :

```text
Animation Speed
```

pour accélérer ou ralentir l'animation.

### 3️⃣ Lancer le tri

Cliquez sur :

```text
Start Insertion Sort
```

L'application affichera alors :

* Les comparaisons effectuées
* Les déplacements des éléments
* Les insertions
* L'évolution du tableau en temps réel

### 4️⃣ Consulter le code source

Cliquez sur :

```text
Show / Hide Code
```

pour afficher ou masquer le code de référence.

---

##  Exemple de fonctionnement

### Tableau initial

```text
[8, 5, 3, 7]
```

### Étape 1

```text
key = 5

8 > 5
→ Décalage de 8 vers la droite

[8, 8, 3, 7]

Insertion de 5

[5, 8, 3, 7]
```

### Étape 2

```text
key = 3

8 > 3
→ Décalage

5 > 3
→ Décalage

[3, 5, 8, 7]
```

### Résultat final

```text
[3, 5, 7, 8]
```

---

##  Structure du projet

```text
Insertion-Sort-Visualizer/
│
├── index.html
├── sary-1.png
├── sary-2.png
└── README.md
```

---

## Objectif pédagogique

Ce projet a été développé afin de :

* Comprendre le fonctionnement du tri par insertion
* Observer chaque étape de l'algorithme
* Apprendre les bases du tri de tableaux
* Visualiser les comparaisons et déplacements effectués
* Faciliter l'apprentissage des algorithmes de tri

---

##  Installation

Clonez le dépôt :

```bash
git clone https://github.com/votre-utilisateur/Insertion-Sort-Visualizer.git
```

Accédez au dossier :

```bash
cd Insertion-Sort-Visualizer
```

Ouvrez simplement :

```text
index.html
```

dans votre navigateur préféré.

---

## Auteur

Projet développé avec l'assistance de l'intelligence artificielle.
et Nandrianina

---

##  Licence

Licence MIT.

Vous êtes libre d'utiliser, modifier et partager ce projet à des fins éducatives ou personnelles.
