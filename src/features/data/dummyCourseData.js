import test from "../../assets/test.mp4";
import ai from "../../assets/ai.jpg";

export const dummyCourseData = {
  _id: "course-1",
  title: "Introduction à l'Intelligence Artificielle",
  instructor: "Sofiane Developer",
  thumbnail: ai,
  description:
    "Découvrez les bases de l’intelligence artificielle, du machine learning et de leurs applications concrètes. Conçu pour les +40 ans curieux de comprendre l’IA sans jargon technique.",
  chapters: [
    {
      id: "ch1",
      title: "Qu’est-ce que l’IA ?",
      summary:
        "Comprendre ce qu’est l’IA, à quoi elle sert, et enlever toute peur du “trop technique”.",
      duration: "6:30",
      videoUrl: test,
      content: `
      ### 🌍 Introduction
      L’intelligence artificielle (IA) n’est pas une idée futuriste, c’est une réalité déjà partout autour de nous : sur nos téléphones, nos ordinateurs, nos voitures ou nos plateformes de streaming.

      ### 🤖 Définition simple
      L’IA, c’est la capacité d’un programme à **imiter certaines fonctions du cerveau humain**, comme :
      - Comprendre le langage,
      - Analyser des données,
      - Reconnaître des images,
      - Ou même proposer des solutions à partir d’exemples.

      ### 🏠 L’IA au quotidien
      Vous l’utilisez sans le savoir :
      - Quand Google complète vos phrases,
      - Quand Netflix recommande un film,
      - Quand votre téléphone reconnaît votre visage.

      ### 💡 À retenir
      L’IA ne remplace pas l’humain, elle **le soutient**.  
      Elle aide à mieux penser, organiser et créer.

      ---
      🧩 **Exercice pratique :**
      Notez trois moments de votre journée où une IA vous a facilité la vie.

      📘 **Résumé :**
      L’IA, c’est une technologie d’aide, pas de remplacement. Comprendre son fonctionnement, c’est apprendre à mieux l’utiliser.
      `,
    },
    {
      id: "ch2",
      title: "Comment fonctionne une IA (simple et visuel)",
      summary:
        "Comprendre les principes de base sans entrer dans la technique.",
      duration: "9:15",
      videoUrl: test,
      content: `
      ### ⚙️ Introduction
      Une IA apprend à partir d’exemples, un peu comme un enfant apprend à reconnaître un chat après en avoir vu plusieurs.

      ### 🧠 Comment une IA apprend
      Elle analyse de grandes quantités de données pour en déduire des modèles.  
      Plus elle voit d’exemples, plus elle devient précise.

      ### 📊 Le rôle des données
      - Les **données**, c’est son carburant.
      - Les **modèles**, c’est son moteur.
      - Et **l’apprentissage**, c’est la route qu’elle suit.

      ### 🚧 Ses limites
      L’IA peut se tromper si :
      - Les données sont incomplètes ou biaisées,
      - Ou si elle rencontre une situation qu’elle n’a jamais vue.

      ### 💡 À retenir
      L’IA apprend comme nous : par répétition, correction et expérience.

      ---
      🧩 **Exercice pratique :**
      Observez une erreur d’IA (traduction étrange, recommandation inutile) et réfléchissez à pourquoi elle a pu se tromper.

      📘 **Résumé :**
      L’IA n’est pas magique. Elle apprend des données qu’on lui donne, et c’est pourquoi elle reste un outil à guider.
      `,
    },
    {
      id: "ch3",
      title: "Utiliser ChatGPT et les IA de texte",
      summary:
        "Savoir parler à une IA, formuler de bonnes demandes (prompts) et utiliser les bons outils.",
      duration: "7:45",
      videoUrl: test,
      content: `
      ### 💬 Introduction
      Les IA comme ChatGPT peuvent rédiger, traduire, résumer, expliquer, ou même créer des idées à partir d’une simple phrase.

      ### ✍️ Comment bien parler à une IA
      On appelle cela le **prompting** :  
      ➜ Plus votre question est claire et précise, plus la réponse sera pertinente.

      Exemple :
      ❌ "Écris-moi un texte sur les voyages."  
      ✅ "Écris un texte optimiste de 100 mots sur les bienfaits du voyage pour les seniors."

      ### 🧰 Applications pratiques
      - Rédiger un mail professionnel,
      - Créer une lettre de motivation,
      - Générer une idée de repas ou d’activité,
      - Traduire ou reformuler un texte.

      ### 💡 Astuce
      Demandez toujours : “Peux-tu améliorer ma phrase ?”  
      L’IA apprend de votre intention.

      ---
      🧩 **Exercice pratique :**
      Essayez trois versions d’une même demande dans ChatGPT et comparez les résultats.

      📘 **Résumé :**
      Bien utiliser l’IA, c’est savoir lui parler. Un bon *prompt* donne un excellent résultat.
      `,
    },
    {
      id: "ch4",
      title: "Créer avec l’IA (image, vidéo, audio)",
      summary:
        "Découvrir la créativité augmentée par l’IA et produire des visuels, sons et vidéos sans compétences techniques.",
      duration: "7:45",
      videoUrl: test,
      content: `
      ### 🎨 Introduction
      L’IA peut être votre assistant créatif : elle transforme vos idées en images, vidéos ou voix sans que vous ayez besoin d’être graphiste.

      ### 🖼️ Créer des images
      Avec des outils comme **Canva AI**, **DALL·E** ou **Leonardo.ai**, vous pouvez générer des visuels à partir d’une phrase :
      > “Un coucher de soleil sur la mer avec style peinture à l’huile.”

      ### 🎧 Créer du son et de la voix
      Des outils comme **ElevenLabs** permettent de créer des voix naturelles pour vos vidéos ou présentations.

      ### 🎬 Créer des vidéos
      Avec **Runway** ou **Pika Labs**, vous pouvez produire des clips courts pour vos réseaux sociaux ou présentations.

      ### 💡 À retenir
      L’IA ne remplace pas votre créativité — elle **la décuple**.

      ---
      🧩 **Exercice pratique :**
      Essayez de créer une image IA qui représente votre passion ou métier.

      📘 **Résumé :**
      Avec les bons outils, vous pouvez créer visuels et sons sans être expert. L’IA rend la création accessible à tous.
      `,
    },
    {
      id: "ch5",
      title: "L’IA pour ton métier ou activité",
      summary:
        "Savoir comment adapter l’IA à son propre domaine d’activité, quel qu’il soit.",
      duration: "7:45",
      videoUrl: test,
      content: `
      ### 💼 Introduction
      Que vous soyez enseignant, commerçant, artisan, indépendant ou salarié, l’IA peut simplifier votre quotidien professionnel.

      ### 🔍 Exemples concrets
      - **Commerçant :** rédiger des descriptions produits ou créer des visuels.
      - **Enseignant :** générer des fiches d’exercices.
      - **Artisan :** créer des devis ou publications Facebook.
      - **Employé de bureau :** rédiger des comptes rendus ou mails automatiques.

      ### 🧰 Outils utiles
      - **ChatGPT** : assistant de rédaction.
      - **Notion AI / Google Workspace** : productivité et organisation.
      - **Canva AI** : création de visuels.
      - **Zapier / Make** : automatiser vos tâches répétitives.

      ### 💡 À retenir
      L’IA est un assistant professionnel polyvalent qui s’adapte à votre rythme.

      ---
      🧩 **Exercice pratique :**
      Choisissez une tâche répétitive dans votre métier et imaginez comment une IA pourrait la simplifier.

      📘 **Résumé :**
      L’IA peut transformer votre manière de travailler. Elle ne remplace pas votre expertise, elle la met en valeur.
      `,
    },
    {
      id: "ch6",
      title: "Sécurité, éthique et confiance numérique",
      summary:
        "Comprendre les enjeux de vie privée, légalité et éthique dans l’usage de l’IA.",
      duration: "7:45",
      videoUrl: test,
      content: `
      ### 🔒 Introduction
      Utiliser l’IA, c’est aussi apprendre à protéger ses données et à rester critique face à ce qu’elle génère.

      ### ⚠️ Confidentialité
      Les IA peuvent analyser vos données.  
      Il est donc important de **ne jamais partager d’informations personnelles sensibles.**

      ### 🧭 L’éthique et les biais
      Une IA peut reproduire les erreurs ou préjugés présents dans les données qu’on lui donne.  
      D’où l’importance de **vérifier les réponses**.

      ### ⚖️ Légalité
      - Respecter les droits d’auteur.
      - Ne pas publier de contenus trompeurs générés par IA.
      - Mentionner l’usage de l’IA quand c’est nécessaire.

      ### 💡 À retenir
      L’IA doit être utilisée avec discernement, transparence et respect.

      ---
      🧩 **Exercice pratique :**
      Testez une information fournie par une IA et vérifiez sa source manuellement.

      📘 **Résumé :**
      L’IA est puissante, mais elle demande responsabilité. La confiance numérique repose sur la vigilance humaine.
      `,
    },
    {
      id: "ch7",
      title: "Devenir autonome et continuer à évoluer",
      summary:
        "Donner aux apprenants les outils pour continuer à explorer, apprendre et s’adapter.",
      duration: "7:45",
      videoUrl: test,
      content: `
      ### 🚀 Introduction
      L’IA évolue vite, mais pas besoin d’être expert pour suivre. Il suffit d’être curieux et de tester régulièrement de nouveaux outils.

      ### 🧭 Où apprendre davantage
      - Suivez des chaînes YouTube sur l’IA.
      - Rejoignez des groupes Facebook ou LinkedIn autour du numérique.
      - Explorez les sites de veille comme FutureTools.io.

      ### 🕒 Créer sa routine IA
      - 5 min/jour pour tester un outil.
      - 10 min/semaine pour lire une actualité IA.
      - 1 fois/mois pour appliquer une nouveauté à votre travail.

      ### 💡 À retenir
      L’IA n’est pas un mode, c’est un nouvel outil d’apprentissage permanent.

      ---
      🧩 **Projet final :**
      Créez votre mini-projet “Mon IA au quotidien” — un texte, un visuel ou une automatisation qui vous simplifie la vie.

      📘 **Résumé :**
      L’IA est un compagnon de progrès. Plus vous l’explorez, plus vous en tirez de valeur.
      `,
    },
  ],
};
