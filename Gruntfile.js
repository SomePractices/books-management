module.exports = function(grunt) {
    pkg:grunt.file.readJSON("package.json");

    grunt.initConfig({
        watch: {//第一个任务 watch
            script: {
                ejs: {
                    files: ['views/**/*.ejs'],
                    options: {
                        livereload: true
                    }
                },
                js: {
                    files: ['public/js/*.js', 'db/**/*.js', 'routes/**/*.js'],
                    tasks: ['jshint'],
                    options: {
                        livereload: true
                    }
                },
                uglify: {//压缩
                    files: ['public/**/*.js'],
                    tasks: ['jshint'],
                    options: {
                        livereload: true
                    }
                },
                styles: {
                    files: ['public/css/'],
                    tasks: ['less'],
                    options: {
                        nospawn: true
                    }
                }
            },


            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    // ignores: ['public/libs/**/*.js']
                },
                all: ['public/js/*.js', 'db/*.js', 'routes/*.js']
            }
        },

        // less: {
        //     development: {
        //         options: {
        //             compress: true,
        //             yuicompress: true,
        //             optimization: 2
        //         },
        //         files: {
        //             'public/build/index.css': 'public/less/index.less'
        //         }
        //     }
        // },
        //
        // uglify: {
        //     development: {
        //         files: {
        //             'public/build/admin.min.js': 'public/js/admin.js',
        //             'public/build/detail.min.js': [
        //                 'public/js/detail.js'
        //             ]
        //         }
        //     }
        // },

        nodemon: {//任务 nodemon
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    nodeArgs: ['--debug'],
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watch: ['./'],
                    delay: 1000,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        // mochaTest: {
        //     options: {
        //         reporter: 'spec'
        //     },
        //     src: ['test/**/*.js']
        // },

        concurrent: {
            develop:{
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');//一旦文件有改动就重新执行在其中执行的任务
    grunt.loadNpmTasks('grunt-contrib-connect');//把项目部署到本地服务器上
    grunt.loadNpmTasks('grunt-nodemon');//实时监听入口文件　app.js,有改动可自动重启app.js
    grunt.loadNpmTasks('grunt-concurrent');//跑多个阻塞的路，优化慢任务(less等)构建的时间
    // grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.option('force', true);//不要因为一些语法的错误终端了grunt的整个服务

    grunt.registerTask('default', ['concurrent']);//注册任务

    // grunt.registerTask('test', ['mochaTest'])
};