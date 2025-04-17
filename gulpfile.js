const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const rename = require('gulp-rename')

// Chemins
const paths = {
    css: 'public/css/*.css',
    output: 'public/dist'
}

// Tâche pour minifier et concaténer le CSS
gulp.task('minify-css', () => {
    return gulp.src(paths.css)
        .pipe(concat('styles.css'))           // Fusionner tous les fichiers CSS
        .pipe(cleanCSS())                     // Minifier
        .pipe(rename({ suffix: '.min' }))     // Renommer en styles.min.css
        .pipe(gulp.dest(paths.output))        // Enregistrer dans /public/dist
})

// Tâche par défaut
gulp.task('default', gulp.series('minify-css'))
