/**
 * Created by admin on 11/28/2019.
 */
let manager = {
    frames : new Array(5),
    pause_active    : {},
    pause_inactive  : {},
    play_active     : {},
    play_inactive   : {},
    next_active     : {},
    next_inactive   : {},
    prev_active     : {},
    prev_inactive   : {},
    under_line      : {},
    trajectory      : {},

    LoadAnimation : function (callback) {
        for (let i = 1; i <= res.frames.count; i++) {
            this.frames[i] = new Image();
            console.log(this.frames);
            this.frames[i].src = makeFrName(i);
        }
        this.frames[res.frames.count-1].onload = function () {
            manager.LoadDecorations(callback);
        }
    },
    
    LoadDecorations : function (callback) {
        this.under_line = new Image();
        this.under_line.src = "./" + res.bottom_line;
        this.trajectory = new Image();
        this.trajectory.src = "./" + res.anim_line;
        this.trajectory.onload = function () {
            callback();
        }
    }

};

function makeFrName(index) {
    return "./" + res.frames.path + res.frames.name + (index <= 9 ? "0" : "") + index + res.frames.format;
}

