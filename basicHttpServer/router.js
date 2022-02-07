function route(pathname) {
    let file, code;

    if(pathname == '/') {
        file = './layout/home.html';
        code = 200;
        return {file , code};
    }
    else {
        file = './layout/notFound.html';
        code = 404;
        return {file , code};
    }
}

exports.route = route;