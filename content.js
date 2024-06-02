document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = link.href;
        });
    });
});
