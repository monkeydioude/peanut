function start()
{
    return {
        draw: function() {
            write("CLIQUES POUR COMMENCER");
        },
        update: function() {
        },
        click: function() {
            setState('PLAY');
        }
    }
}