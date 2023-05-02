const dataBookList = document.querySelector("[data-book-list]")
const dataAddBook = document.querySelector("[data-add-book]")
const dataButtonHeaderAdd = document.querySelector("[data-button-header-add]")
const dataAddNewBookButton = document.querySelector("[data-add-new-book-button]")

//////////// Showing Add new book section
document.addEventListener("click", (e) => {
    if (e.target === dataButtonHeaderAdd) {
        dataAddBook.style.display = ""
        dataBookList.style.display = "none"
    }
})

