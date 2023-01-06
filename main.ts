class StopWatch {
   private duration: number;
   private status: string;
   private currentTime: any;
   private domRef: HTMLElement | null; 
   constructor(wrapper: string) {
      this.domRef = document.getElementById(wrapper);
      this.duration = 0;
      this.status = 'stopped';
      if (!this.domRef) throw new Error('Does not exstis');
      this.render();
   }
   private render() {
         this.domRef!.append(
            createBtn('start', () => this.start()),
            createBtn('stop', () => this.stop()),
            createBtn('reset', () => this.reset()),
         )
   }
   start() {
      if(this.status === 'started') throw new Error('already started');
      this.currentTime = Date.now();
      this.status = 'started';
   }
   stop() {
      if(this.status === 'stopped') throw new Error('already stopped');
      this.duration = Date.now() - this.currentTime + this.duration;
      console.log(this.duration);
      this.status = 'stopped';
      return this.duration;
   }
   reset(){
      if(this.status === 'started') this.stop();
      this.duration = 0;
   }
}
function createBtn(name: string, listener: () => void) {
   const startBtn = document.createElement('button');
   startBtn.innerText = name;
   startBtn.addEventListener('click', listener);
   return startBtn;
}
(function() {
   const btns = document.getElementsByClassName('add-btn');
   btns[0].addEventListener('click', () => {
      new StopWatch(btns[0].getAttribute('data-idw') as string);
   });
})();