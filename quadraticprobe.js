// https://en.wikipedia.org/wiki/Quadratic_probing

// For m = 2^n, a good choice for the constants are c1 = c2 = 1/2,
// as the values of h(k,i) for i in [0,m-1] are all distinct.

// In order to guarantee that your quadratic probes will hit
// every single available spots eventually, your table size must meet
// these requirements:
// Be a prime number
// never be more than half full (even by one element)

// there is no guarantee of finding an empty cell once the table
// gets more than half full, or even before the table gets half full
// if the table size is not prime


var MAX = 51;

class KVPair {
  constructor(key, value, hash) {
    this.key = key;
    this.value = value;
    this.hash = hash;
  }
}

class QuadraticProbe {
  constructor() {
    // public array
    this.array = new Array(MAX);

    // private
    function hash(key) {
      if (typeof key !== "string") {console.log(`hash - input must be string!`); return null;}
      let value = 0;
      let length = 0;
      [...key].forEach(function(element, index){
        value += element.charCodeAt(0);
        length = index;
      });
      return (value * (length+1)) % MAX;
    }

    // private
    // standard H+1^{2},H+2^{2},H+3^{2},H+4^{2},...,H+k^{2}


    function quadraticProbe(index, j) {
      return index + Math.pow(j, 2);
    }

    // PUBLIC
    this.insert = function(kv) { // Get the key k
      if (kv.constructor.name !== "KVPair") {console.log(`uh oh! the object isn't a KVPair...returning`); return;}
      let j = 0; // set counter j = 0
      let index = hash(kv.key); // Compute hash function h[k] = k % SIZE
      console.log(`initially indexed to ${index}`);

      while(index < this.array.length) {
        if (!this.array[index]) { // If hashtable[h[k]] is empty
            kv.hash = index;      // Insert key k at hashtable[h[k]]
            this.array[index] = kv;
            return;
        } else {
          console.log(`uh oh ${index} already has content`);
          index = quadraticProbe(index, ++j);
          console.log(`Let's try index ${index}`)
        }
      }
      console.log(`Cannot find empty slot for ${kv.key}. Note: For linear probing it is a bad \n idea to let the hash table get nearly full. there is no guarantee of finding an empty cell \n once the table gets more than half full, or even before the \ntable gets half full if the table size is not prime.`);
    }


    this.search = function(key) {
      let index = hash(key); // Compute hash function h[k] = k % SIZ
      console.log(`initial search for ${key} indexed to ${index}`);
      let j = 0; // set counter j = 0
      while(index < this.array.length) {
        if (!this.array[index]) { console.log(`${key} does not exist`); return null; }
        if (this.array[index].key === key) {return this.array[index];}
        else {
          index = quadraticProbe(index, ++j);
          console.log(`Let's try index ${index}`);
        }
      }
      console.log(`search for key (${key}) not found`);
      return null;
    }
  } // constructor

  print() {
    console.log(`-------- length of array: ${this.array.length} --------`);

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] && this.array[i].key)
      console.log(`${i} - (${this.array[i].hash}) ${this.array[i].key}, ${this.array[i].value}`);
      else
      console.log(`${i}`);
    }
    console.log(`=============================================`);
  }

  // functions on the prototype

}

let q = new QuadraticProbe();
q.insert(new KVPair("age", 38));
q.insert(new KVPair("first", "ricky"));
q.insert(new KVPair("last", "tsao"));
q.insert(new KVPair("city", "shenzhen"));
q.insert(new KVPair("favorite snacks", "dumplings"));
q.insert(new KVPair("color", "red"));
q.insert(new KVPair("school", "usc"));
q.insert(new KVPair("job", "software"));
q.insert(new KVPair("company", "epam"));
q.insert(new KVPair("app", "douyin"));
q.insert(new KVPair("status", "single"));
q.insert(new KVPair("savings", "1234567"));
q.insert(new KVPair("holiday", "cny"));
q.insert(new KVPair("video game", "sf"));
q.insert(new KVPair("mountain", "nanshan"));
q.insert(new KVPair("move", "tatsmakesen byuuuukyaku!!"));

q.print();

console.log(q.search("age"));
console.log(q.search("mountain"));
console.log(q.search("move"));
console.log(q.search("haha"));
console.log(q.search("first"));
console.log(q.search("lasty"));