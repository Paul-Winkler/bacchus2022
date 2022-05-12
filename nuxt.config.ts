import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
    },
    head: {
        link: [
            { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
            { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
            { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
            { rel: "manifest", href: "/site.webmanifest" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@1,500&display=swap" }
        ]
    },
    css: [
        "~/assets/styling/base.css"
    ],
    target: 'server'
})