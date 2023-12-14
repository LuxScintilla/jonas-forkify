import View from "./view.js";
import icons from "url:../../img/icons.svg"; //parcel2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextPage();
    }

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPreviousPage();
    }

    // other page
    if (this._data.page < numPages) {
      return [
        this._generateMarkupPreviousPage(),
        this._generateMarkupNextPage(),
      ];
    }

    // page 1, and there are NO other pages
    return "";
  }

  _generateMarkupNextPage() {
    return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
  }

  _generateMarkupPreviousPage() {
    return `
    <button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    `;
  }
}

export default new PaginationView();
