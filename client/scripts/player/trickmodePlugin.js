mw.kalturaPluginWrapper(function() {
    mw.PluginManager.add( 'trickmodePlugin', mw.KBasePlugin.extend({
        setup: function() {
            var kdp = this.getPlayer();
            kdp.addJsListener('playbackComplete', this.playbackComplete);
            document.onkeydown = function(e) {
                var kdp = document.getElementById('kaltura_player');
                debugger;
                switch(e.keycode) {
                    case 37: //left arrow
                        kdp.sendNotification('doSeek', kdp.evaluate('{video.player.currentTime}') - 10);
                        break;
                    case 39: //right arrow
                        kdp.sendNotification('doSeek', kdp.evaluate('{video.player.currentTime}') + 10);
                        break;
                    default:
                        break;
                }
 
            }
        },
        playbackComplete: function() {
           alert('Video ended');
        }
    }));
});