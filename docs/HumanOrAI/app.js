// --- mapping ONLY (no text content) ---
const groups = [
  { name: "A", files: ["x7f3a.txt", "k29qd.txt"] },
  { name: "B", files: ["p91lm.txt", "t82aa.txt"] },
  { name: "C", files: ["c01zz.txt", "v88gh.txt"] },
  { name: "D", files: ["d72pl.txt", "m44rt.txt"] },
  { name: "E", files: ["e55aa.txt", "q19bn.txt"] },
  { name: "F", files: ["f90xy.txt", "z11kk.txt"] }
];

// --- persistent assignment ---
let assigned = JSON.parse(localStorage.getItem("assignedFiles"));

if (!assigned) {
  assigned = groups.map(group => {
    const choice = Math.floor(Math.random() * 2);
    return {
      name: group.name,
      file: group.files[choice],
      text: null
    };
  });

  localStorage.setItem("assignedFiles", JSON.stringify(assigned));
}

// --- load only assigned texts ---
Promise.all(
  assigned.map(item =>
    fetch(`texts/${item.file}`)
      .then(res => res.text())
      .then(text => item.text = text)
  )
).then(() => {
  render();
});

// --- carousel ---
let index = 0;

function render() {
  const item = assigned[index];
  document.getElementById("content").innerHTML =
  `<strong>Sample ${index + 1} of 6: ${item.file}</strong> <br><br>${item.text}`;
}

function next() {
  if (index < assigned.length - 1) {
    index++;
    render();
  }
}

function prev() {
  if (index > 0) {
    index--;
    render();
  }
}