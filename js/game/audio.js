/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function SoundBuffer() {
    this.filename = "";
    this.buffer1 = new Audio();
    this.buffer2 = new Audio();
    this.loop = false;
}

sound_engine = new SoundEngine();

function SoundEngine() {
    var audio_codec = "";
    var mute = false;
    var sound_buffers = new Array();
    var current_sound = "";

    this.Init = function() {
        this.GetAudioCodec();
    }

    this.GetAudioCodec = function () {
        audio = new Audio();
        
        if (audio.canPlayType('audio/ogg')) {
            audio_codec = "ogg";
        } else {
            audio_codec = "mp3";
        }
        
        return audio_codec;
    }
    
    this.MuteSound = function () {
        if (mute) {
            mute = false;
        } else {
            mute = true;
        }
    }
    
    this.OnMute = function () {
        return mute;
    }
    
    this.Set = function (snd_file) {
        audio_buffer = new SoundBuffer();
        audio_buffer.buffer1.src = "audio/" + audio_codec + "/" + snd_file + "." + audio_codec;
        audio_buffer.buffer2.src = "audio/" + audio_codec + "/" + snd_file + "." + audio_codec;
        sound_buffers[snd_file] = audio_buffer;
        sound_buffers[snd_file].filename = snd_file;
    }
    
    this.GetCurrentSound = function () {
        return current_sound;
    }

    this.PlaySound = function(snd_file) {
        if (!this.OnMute()) {
            audio = new Audio("audio/" + audio_codec + "/" + snd_file + "." + audio_codec);
            audio.play();
        }
    }
    
    this.Play = function(buffer,snd_file) {
        if (!this.OnMute()) {   
            if (buffer == "buffer1") {
                snd_file.buffer1.play();
            } else {
                snd_file.buffer2.play();
            }
        }
    }
    
    this.PlayLooped = function (snd_file) {
        current_sound = snd_file;
        if (sound_buffers[snd_file].buffer1.src != "") {
            sound_buffers[snd_file].buffer1.addEventListener('ended', function() {
                this.currentTime = 0;
                sound_engine.Play("buffer2",sound_buffers[snd_file]);
                this.pause();
            }, false);

            sound_buffers[snd_file].buffer2.addEventListener('ended', function() {
                this.currentTime = 0;
                sound_engine.Play("buffer1",sound_buffers[snd_file]);
                this.pause();
            }, false);

            this.Play("buffer1",sound_buffers[snd_file]);
        }
    }
    
    this.Stop = function (channel) {
        sound_buffers[channel].buffer1.pause();
        sound_buffers[channel].buffer2.pause();
    }

    this.Stop = function() {
        if (typeof sound_buffers[current_sound] != "undefined") {
            sound_buffers[current_sound].buffer1.pause();
            sound_buffers[current_sound].buffer2.pause();
        }
    }
    
    this.Init();
}