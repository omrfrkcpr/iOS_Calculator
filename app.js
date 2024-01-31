//* ====================================================== //
//*                     IOS CALCULATOR
//* ====================================================== //

//& Selectors

const numberDivs = document.querySelectorAll(".num"); // nodeList
const operationDivs = document.querySelectorAll(".operator");
const equalDiv = document.querySelector(".equal");
const preDisplayDiv = document.querySelector(".previous-display");
const currentDisplayDiv = document.querySelector(".current-display");

//& Variables

let preDisplayText = "";
let currentDisplayText = "";
let operation = "";

// prepare a boolean variable to enter new numbers in the new operation after pressing the percentage or equal to the percentage, it is clicked, not clicked, the equalize (and percentage) button is clicked, this is true, so it is clicked.

//^ clicking on any numbers
// when any number clicked (return true on that number)
numberDivs.forEach((number) => {
  number.onclick = () => {
    displayPrep(number.textContent);
    updateDisplay();
  };
});

//& Functions

//! displayPrep Function
const displayPrep = (num) => {
  //kullanıcı 0 girerse, sonrasında 0 ve . dışında bir sayı girerse, ekranda sadece girilen yeni sayı (0 iptal olsun) gözüksün
  //kullanıcı herhangi bir yerde . girmişken, tekrar nokta girmeye kalkarsa giremesin
  //kullanıcı 10 haneden sonra girmesin
  //kullanıcı ilk başta 0 girer ardından tekrar 0 girerse, girilmesin, tek 0 döndürsün
  //eşittir yada percent a basıldıktan sonra girilen number tek başına ekranda görünsün,çünkü yeni işlem başlıyor(ekranda 72 yazan işlem sonucu varken 5 e basınca 725 olmasın)
  //?bütün şartları başarı ile geçtiyse basılan numaraları arka arkaya ekle

  currentDisplayText += num;
};

//! update display
const updateDisplay = () => {
  currentDisplayDiv.textContent = currentDisplayText;
  //işlem sonucu 8 haneyi geçmesin

  // after added operator
  if (operation) {
    preDisplayDiv.textContent = `${preDisplayText} ${operation}`;
  } else {
    preDisplayDiv.textContent = "";
  }
};

//^ clicking on any operations
// when any op clicked (return true on that op)
operationDivs.forEach((op) => {
  op.onclick = () => {
    //?currentDisplay boşken, hiçbir şekilde sayı girişi yapılmamışsa, operatöre basılmasın. boş return yapmaya çalıştığınız işlemi yaptırmaz.
    //? return fonksiyon içerisinde her yerde kullanılabilir. Kod return satırına eriştiğinde fonksiyon durur ve değer fonksiyonun çağırıldığı yere geri gönderilir. Bir fonksiyon içerisinde birden fazla return fonksiyonu da olabilir. return değer döndürmek zorunda değildir. return den sonra else yerine if kullanmalıyız
    // If the operation is pressed repeatedly without pressing equal (if the operation is continued while the upper and lower screens are full)

    operation = op.textContent;
    preDisplayText = currentDisplayText;
    currentDisplayText = "";
    updateDisplay();
  };
});

//^ clicking on equal operator

//! calculate function

//^ clicking on AC operator

//^ clicking on PM (plus-minus) operator
