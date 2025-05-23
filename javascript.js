document.addEventListener("DOMContentLoaded", () => {
	const boxes = document.querySelectorAll(".box");
	const playerX = "X";
	const playerO = "O";
	let actualPlayer = playerX;
	const message = document.querySelector(".win-msg");
	const winnerName = document.querySelector(".winner-name");
	const button = document.querySelector(".button");

	const winnerCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let tableState = Array(9).fill(null);

	boxes.forEach((box) => {
		box.addEventListener("click", () => {
			const index = parseInt(box.getAttribute("data-index"));

			if (box.textContent === "") {
				box.innerHTML = `<span class="${actualPlayer.toLowerCase()}">${actualPlayer}</span>`;

				tableState[index] = actualPlayer;

				if (actualPlayer === "X") {
					actualPlayer = "O";
				} else {
					actualPlayer = "X";
				}
			}

			lookingWinner();
		});
	});

	function lookingWinner() {
		boxes.forEach(box => box.classList.remove("winner"));

		for (let comb of winnerCombinations) {
			const [a, b, c] = comb;

			if (tableState[a] === tableState[b] && tableState[a] === tableState[c] && tableState[a] !== null) {
				winnerName.textContent = tableState[a];

				boxes[a].classList.add("winner");
				boxes[b].classList.add("winner");
				boxes[c].classList.add("winner");

				applyWinAnimation(a);
				applyWinAnimation(b);
				applyWinAnimation(c);

				message.classList.remove("hidden");
				break;
			}
		}
	}

	function applyWinAnimation(index) {
		const span = boxes[index].querySelector("span");
		span.classList.remove("winner-animation");
		void span.offsetWidth;
		span.classList.add("winner-animation");
	}

	function resetGame() {
		tableState = Array(9).fill(null);

		actualPlayer = "X";

		boxes.forEach((box) => {
			box.textContent = "";
		});

		message.classList.add("hidden");
	}

	button.addEventListener("click", resetGame);
});
