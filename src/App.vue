<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,400;0,500;0,700;1,400&display=swap');

/* -----------------------------------------------------------Basic Styling */
body {
  background-color: #f2f2f2;
  font-family: 'Barlow Semi Condensed', sans-serif;
  color: #0E0819;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* -----------------------------------------------------------Typography */
h1 {
  font-weight: 700;
  font-size: 34px;
  line-height: 34px;
  letter-spacing: 0.002em;
  margin: 0 0 15px 0;
}


h2 {
  font-weight: 500;
  font-size: 21px;
  line-height: 21px;
  margin: 0 0 15px 0;
}

h3 {
  font-weight: 400;
  font-size: 21px;
  line-height: 21px;
  margin: 0;
}

h4 {
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  margin: 0;
}

p {
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  margin: 0;
}

label {
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  margin: 0;
}

.fontLila {
  color: #6638B6;
}

.fontWhite {
  color: white;
}

.fontGrey {
  color: #8D8D8D;
}

/* Allgemeines Padding ------------------------------------------ */

.padding-60 {
  padding: 60px;
  box-sizing: border-box;
}

/* Input Styling ------------------------------------------ */

input, textarea {
  height: 50px;
  border-radius: 10px;
  border: 1px solid #8D8D8D;
  padding: 5px 30px;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-weight: 400;
  font-size: 18px;
  resize: none;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  cursor: text;
  outline: none;
  border: 2px solid #05C3DE;
}

.filled {
  border-color: #05C3DE;
}

/* -----------------------------------------------------------Link */

/* HIGHLIGHT SELECTION */


.selected {
  box-shadow: 0 0px 4px 10px #05C3DE;
  transition: ease-in 0.1s;
}


/* ---------------------------------- PLACEHOLDER TEXT dev*/

.fontPlaceholder {
  color: #ff00ff;
}

</style>
