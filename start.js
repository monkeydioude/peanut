function start()
{
    return {
        draw: function() {
            write("CLIQUE ou ENTREE POUR COMMENCER");
        },
        update: function() {
        },
        click: function() {
            setState('PLAY');
        },
        keyhit:  {
            "ENTER": function() {
                setState("PLAY")
            }
        }
    }
}