function showTab(tabName) {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.style.backgroundColor = '#ddd';
    });

    var content = document.querySelectorAll('.content > div');
    content.forEach(function(tabContent) {
        tabContent.style.display = 'none';
    });

    document.getElementById(tabName).style.display = 'block';
}