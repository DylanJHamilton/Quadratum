{%- if settings.enable_search_popup -%}
  <div
    id="QtmSearchPopup"
    class="qtm-search-popup"
    hidden
    aria-hidden="true"
    role="dialog"
    aria-modal="true"
    aria-labelledby="QtmSearchPopupTitle"
  >
    <div class="qtm-search-popup__overlay" data-search-popup-close></div>

    <div
      class="qtm-search-popup__dialog"
      style="--qtm-search-popup-max-width: {{ settings.search_popup_max_width | default: 760 }}px;"
    >
      <button
        type="button"
        class="qtm-search-popup__close"
        data-search-popup-close
        aria-label="Close search"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="qtm-search-popup__content">
        <h2 id="QtmSearchPopupTitle" class="qtm-search-popup__title">
          {{ settings.search_popup_heading | default: 'Search' }}
        </h2>

        {%- if settings.search_popup_subheading != blank -%}
          <p class="qtm-search-popup__subtitle">
            {{ settings.search_popup_subheading }}
          </p>
        {%- endif -%}

        {% render 'search-form-static',
          form_context: 'popup',
          input_id: 'QtmSearchPopupInput',
          placeholder: settings.search_popup_placeholder | default: settings.search_placeholder,
          show_button: true,
          extra_class: 'qtm-search-popup__form'
        %}
      </div>
    </div>
  </div>
{%- endif -%}