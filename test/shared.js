fs.open(path, 'w+', function(err, data) {
    if (err) {
        console.log("ERROR !! " + err);
    } else {
        fs.write(data, 'content', 0, 'content length', null, function(err) {
            if (err)
                console.log("ERROR !! " + err);
            fs.close(data, function() {
                console.log('written success');
            });
        });
    }
});
