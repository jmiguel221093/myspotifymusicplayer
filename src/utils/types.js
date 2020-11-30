const types = {
    routes: {
        home: '/',
        account: 'https://www.spotify.com/mx/account/overview/',
        playlists: '/playlists',
        playlist: '/playlist/',
        library: {
            baseUrl: '/library',
            tracks: '/tracks',
            albums: '/albums',
            podcasts: '/podcasts'
        },
        player: '/player',
        search: '/search'
    },
    "es-MX": {
        loginDescription: "Este es un reproductor de música no oficial de Spotify, ha sido creado únicamente como proyecto personal de Miguel González, para comenzar a usarlo debes iniciar sesión con tu cuenta de Spotify Premium",
        pages: {
            playlists: {
                title: "Playlists"
            },
            library: {
                title: "Biblioteca",
                menu: {
                    tracks: "Canciones",
                    albums: "Álbumes",
                    podcasts: "Podcasts"
                }
            },
            search: {
                title: "Buscar",
                emptySearch: "Intenta escribir algo",
                notFound: "No se han encontrado resultados"
            }
        },
        menuLinks: {
            playlists: "Playlists",
            library: "Mi música",
            search: "Buscar"
        },
        userMenu: {
            account: "Mi cuenta",
            logout: "Cerrar sesión",
            about: "Acerca de",
            contact: "Contacto",
            mention: "Este proyecto fue creado y diseñado por Miguel González",
            rights: "Todos los derechos reservados"
        },
        about: {
            title: "¡Hola!",
            p1: "Este proyecto surge con el único fin de tener algo único entre mis aplicaciones de uso diario, siempre he tratado de personalizar mis herramientas completamente como a mi me gusta, entonces pensé en crear una nueva apariencia de Spotify, no reemplazar en un inicio la funcionalidad completa, más bien con funcionalidades que a mí me sirvieran y me permitieran escuchar mi música en mi cuenta de Spotify.",
            p2: "Este proyecto no fue pensado para realizar ventas ni nada relacionado a eso. Este proyecto fue creado con el afán de practicar mis habilidades de programación, también para gastar el tiempo. Si tienes alguna pregunta sobre el proyecto o quieres saber más sobre mí, puedes enviarme un mensaje de correo electrónico o puedes visitar mi perfil de <a href='https://www.instagram.com/ux.miguelgonzalez/' target='_blank'>Instagram</a> o <a href='https://www.linkedin.com/in/miguel-gonz%C3%A1lez-00012891/' target='_blank'>LinkedIn</a>.",
            p3: "Si eres desarrollador y quieres acceder al código del proyecto, no esperes un repositorio en Github o en alguna plataforma relacionada, pero puedes usar el reproductor para tu uso personal.",
            p4: `Las tecnologías empleadas para la construcción de este proyecto fueron:<br />
            ReactJS - Webpack - Spotify API - Spotify Playback SDK`,
            p5: "La funcionalidad debe mejorar, faltan algunas validaciones de errores por lo que el proyecto se considera un alfa o una beta de su funcionamiento.",
            p6: "Saludos, ánimo y bendiciones."
        },
        contact: {
            title: "Contacto",
            description: "Por favor contáctame por correo electrónico",
            email: "jmiguel.gonzalez221093@gmail.com"
        }
    },
    "en-US": {
        loginDescription: "This is an unofficial Spotify music player, it has been created solely as a personal project of Miguel González, to start using it you must log in with your Spotify Premium account",
        pages: {
            playlists: {
                title: "Playlists"
            },
            library: {
                title: "Library",
                menu: {
                    tracks: "Tracks",
                    albums: "Albums",
                    podcasts: "Podcasts"
                }
            },
            search: {
                title: "Search",
                emptySearch: "Try to write something",
                notFound: "No results found"
            }
        },
        menuLinks: {
            playlists: "Playlists",
            library: "Library",
            search: "Search"
        },
        userMenu: {
            account: "Account",
            logout: "Logout",
            about: "About",
            contact: "Contact",
            mention: "This project was created and designed by Miguel González",
            rights: "All rights reserved"
        },
        about: {
            title: "Hi!",
            p1: "This project arises with the sole purpose of having something unique among my applications of daily use, I have always tried to customize my tools completely as I like, so I thought of creating a new look for Spotify, not replacing the full functionality at first. Rather, with features that would serve me and allow me to listen to my music on my Spotify account.",
            p2: "This project was not intended for sales or anything related to that. This project was created in an effort to practice my programming skills, also to spend time. If you have any questions about the project or want to know more about me, you can send me an email or you can visit my profile on <a href='https://www.instagram.com/ux.miguelgonzalez/' target='_blank'>Instagram</a> or <a href='https://www.linkedin.com/in/miguel-gonz%C3%A1lez-00012891/' target='_blank'>LinkedIn</a>.",
            p3: "If you are a developer and want to access the project's code, don't expect a repository on Github or some related platform, but you can use the player for your personal use.",
            p4: `The technologies used for the construction of this project were:<br />
            ReactJS - Webpack - Spotify API - Spotify Playback SDK`,
            p5: "The functionality needs to improve, some bug validations are missing so the project is considered an alpha or beta of its operation.",
            p6: "Greetings, cheers and blessings."
        },
        contact: {
            title: "Contact",
            description: "Please contact me by email",
            email: "jmiguel.gonzalez221093@gmail.com"
        }
    }
}

export {
    types
}