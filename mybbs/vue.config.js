module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target: 'https://simplebbs.iterator-traits.com',
                ws: true,
                changeOrigin: true
            }
        }
    }
}