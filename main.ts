class StopWatch {
   private duration: number;
   private status: string;
   private currentTime: any;
   private domRef: HTMLElement | null;
   private interval: any;
   private milliSecond: number;
   private second:number;
   private minute: number;

   constructor(wrapper: string) {
      this.duration = 0;
      this.milliSecond = 0;
      this.second = 0;
      this.minute = 0;

      this.domRef = document.getElementById(wrapper);
      this.status = 'stopped';
      
      if (!this.domRef) throw new Error('Does not exist');
      this.render();
   }

   private render() {
         this.domRef!.append(
            createBtn('start', () => this.start()),
            createBtn('stop', () => this.stop()),
            createBtn('reset', () => this.reset()),
         )
   }

   private start() {
      if(this.status === 'started') throw new Error('already started');
      this.currentTime = Date.now();
      this.status = 'started';

      const p = document.createElement("p");
      p.id = "p";
      document.body.appendChild(p);

      this.interval =  setInterval(() => {
         [this.minute, this.second, this.milliSecond]  = this.currentWatch();
         document.getElementById("p")!.innerHTML =  `${this.minute} : ${this.second} : ${this.milliSecond}`;
      }, 100);
   }

   private currentWatch() {
      this.duration = Date.now() - this.currentTime;

      if(this.status === 'stopped') this.stop();

      let minutes = Math.floor(this.duration / (1000 * 60));
      let seconds = Math.floor((this.duration % (1000 * 60)) / 1000);
      let milliSeconds = Math.floor(this.duration % 1000);

      this.minute = minutes;
      this.second = seconds;
      this.milliSecond = milliSeconds;
      
      return [this.minute, this.second, this.milliSecond];
   }

   stop() {
      clearInterval(this.interval);
      if(this.status === 'stopped') throw new Error('already stopped');

      this.duration = Date.now() - this.currentTime + this.duration;

      this.status = 'stopped';

      return this.duration;
   }

   reset(){
      if(this.status === 'started') this.stop();
      this.duration = 0;
      document.getElementById("p")!.innerHTML = this.duration.toString();
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