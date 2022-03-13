export default `extends ../../layouts/base

block head
    title {{ name }}

block content
    main(data-barba="container" data-barba-namespace="{{ name }}").{{ name }}
        h1 {{ name }}`;
