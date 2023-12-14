import {defineConfig} from 'histoire'
import {HstSvelte} from '@histoire/plugin-svelte'

export default defineConfig({
    plugins: [HstSvelte()],
    vite: {
        server: {
            host: true
        }
    },
    setupFile: 'histoire.setup.ts',
    tree: {
        groups: [
            {
                id: 'top',
                title: '',
            },
        ],
    },
})
