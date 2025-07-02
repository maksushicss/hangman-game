questions = [
    { question: "En çok kardeşi olan meyve hangi meyvedir?", answer: "UZUM" },
    { question: "Akşam baktim çok idi, Sabah baktim yok idi.", answer: "YILDIZ" },
    { question: "Kuyruğu var, at değil. Kanadi var, kuş değil.", answer: "BALIK" },
    { question: "Bilgi verir herkese, En güzel dosttur bize.", answer: "KITAP" },
    { question: "Evi sirtinda, ayaği karninda. İzi yildiz, gözleri boynuz.", answer: "SALYANGOZ" },
    { question: "Arabadan atladi, pantolonu patladi.", answer: "KARPUZ" },
    { question: "Yer altinda yuvasi var, firça gibi dikeni var.", answer: "KIRPI" },
    { question: "Herkesin önünde şapka çıkarttığı kişi kimdir?", answer: "BERBER" },
    { question: "Hangi macunun tadı güzeldir?.", answer: "LAHMACUN" },
    { question: "Ay varken uçar, güneş varken kaçar.", answer: "YARASA" },
]

//! Sayfa yüklendiğinde:
//! Sorular listesinden rastgele bir tane seç.
//! Cevabın uzunluğu kadar alt çizgi göster.
//! Doğru ve yanlış tahminleri sıfırla.

let randomNum = Math.floor(Math.random() * questions.length)
let randomQuestion = questions[randomNum].question
let randomAnswer = questions[randomNum].answer
let harfler
let answerArray = []

let endGame = document.querySelector(".end-game")
let resultTxt = document.querySelector(".result-txt")
let head = document.querySelector(".head")
let body = document.querySelector(".body")
let leftArm = document.querySelector(".left-arm")
let rightArm = document.querySelector(".right-arm")
let leftLeg = document.querySelector(".left-leg")
let rightLeg = document.querySelector(".right-leg")

let incorrectNumberArea = document.querySelector(".incorrect-am")
let incorrectGuessCount

let answerArea = document.querySelector(".rs-top-ct")
let questionArea = document.querySelector(".hint-txt")

let letters = document.querySelectorAll(".letter")

for (let i = 0; i < randomAnswer.length; i++) {
    harfler = randomAnswer.at(i) // cevapları tek tek array e at
    answerArray.push(harfler)
}

addEventListener("DOMContentLoaded", () => {
    incorrectGuessCount = 0

    for (let i = 0; i < randomAnswer.length; i++) {
        let letterBox = document.createElement("div") // cevap kadar kutu oluştur
        letterBox.classList.add("letter-box")

        let answer = document.createElement("div")
        answer.classList.add("answer")
        answer.innerText = answerArray[i] // her kutuya arraydeki harfleri koyduk ve gizledik
        answer.style.visibility = "hidden"

        letterBox.appendChild(answer)
        answerArea.appendChild(letterBox) //
    }

    let ekrandakiHarfler = document.querySelectorAll(".answer")

    questionArea.innerHTML = randomQuestion // soruyu ekrana getir
    let dogruSayisi = 0

    letters.forEach((letter) => {
        letter.addEventListener("click", (e) => {
            let tiklananDiv = e.target
            let tiklananHarf = e.target.innerText // Oyun Başlasın !!!
            let dogruMu = false

            for (let i = 0; i < answerArray.length; i++) {
                if (tiklananHarf == answerArray[i]) {
                    dogruMu = true
                    dogruSayisi++
                    ekrandakiHarfler[i].style.visibility = "visible"
                    // seçilen harfe sahip cevap kutusu görünür olsun
                    if (dogruSayisi == answerArray.length) {
                        endGame.style.display = "flex"
                        document.querySelector(".new-game-btn").addEventListener("click", () => {
                            location.reload()
                        })
                    }
                }
            }

            if (!dogruMu) {
                incorrectGuessCount++
                incorrectNumberArea.innerText = `${incorrectGuessCount} / 6`
                tiklananDiv.classList.add("disable")
                tiklananDiv.style.background = "#ccc"

                if (incorrectGuessCount == 1) {
                    head.style.display = "flex"
                } else if (incorrectGuessCount == 2) {
                    body.style.display = "flex"
                } else if (incorrectGuessCount == 3) {
                    leftArm.style.display = "flex"
                } else if (incorrectGuessCount == 4) {
                    rightArm.style.display = "flex"
                } else if (incorrectGuessCount == 5) {
                    leftLeg.style.display = "flex"
                } else if (incorrectGuessCount == 6) {
                    rightLeg.style.display = "flex"
                    endGame.style.display = "flex"
                    resultTxt.innerText = "Oyunu Kaybettiniz!"
                    document.querySelector(".new-game-btn").addEventListener("click", () => {
                        location.reload()
                    })
                }
            }
        })
    })
})
