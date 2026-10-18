/* Product service enhancements. Native forms and initial pickup content remain usable without JS. */
(() => {
  if (!customElements.get("q-gift-recipient")) {
    customElements.define(
      "q-gift-recipient",
      class extends HTMLElement {
        connectedCallback() {
          this.controller?.abort();
          this.controller = new AbortController();
          const toggle = this.querySelector("[data-recipient-toggle]");
          const fields = this.querySelector("[data-recipient-fields]");
          if (!toggle || !fields) return;
          const email = fields.querySelector("[data-recipient-email]");
          const offset = fields.querySelector("[data-recipient-offset]");
          const date = fields.querySelector("[data-recipient-date]");
          const localDate = (day) =>
            `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
          const today = new Date();
          const limit = new Date(today);
          limit.setDate(limit.getDate() + 90);
          date.min = localDate(today);
          date.max = localDate(limit);
          offset.disabled = false;
          offset.value = String(today.getTimezoneOffset());
          const update = () => {
            fields.hidden = !toggle.checked;
            fields.disabled = !toggle.checked;
            email.required = toggle.checked;
          };
          toggle.addEventListener("change", update, {
            signal: this.controller.signal,
          });
          update();
        }
        disconnectedCallback() {
          this.controller?.abort();
        }
      },
    );
  }
  if (!customElements.get("q-pickup-availability")) {
    customElements.define(
      "q-pickup-availability",
      class extends HTMLElement {
        connectedCallback() {
          this.controller?.abort();
          this.controller = new AbortController();
          this.form = this.closest("form");
          if (!this.form) return;
          this.variantId = this.dataset.variantId;
          const changed = () => queueMicrotask(() => this.refresh());
          this.form.addEventListener("change", changed, {
            signal: this.controller.signal,
          });
          this.form.addEventListener("qtm:variant-restored", changed, {
            signal: this.controller.signal,
          });
          this.refresh();
        }
        async refresh(force = false) {
          const id = this.form?.querySelector('[name="id"]')?.value || "";
          if (!force && id === this.variantId) return;
          this.variantId = id;
          this.request?.abort();
          this.replaceChildren();
          if (!/^\d+$/.test(id)) {
            this.removeAttribute("aria-busy");
            return;
          }
          const request = (this.request = new AbortController());
          this.setAttribute("aria-busy", "true");
          try {
            const root = (this.dataset.rootUrl || "/").replace(/\/?$/, "/");
            const url = new URL(
              `${root}variants/${id}/?section_id=pickup-availability`,
              window.location.origin,
            );
            const response = await fetch(url, {
              signal: request.signal,
              credentials: "same-origin",
            });
            if (!response.ok) throw new Error("Pickup request failed");
            const html = new DOMParser().parseFromString(
              await response.text(),
              "text/html",
            );
            const content = html.querySelector("[data-pickup-content]");
            if (!content) throw new Error("Pickup response unavailable");
            if (
              request.signal.aborted ||
              this.variantId !== id ||
              !this.isConnected
            )
              return;
            this.replaceChildren(content);
          } catch (error) {
            if (
              request.signal.aborted ||
              this.variantId !== id ||
              !this.isConnected
            )
              return;
            const message = document.createElement("p");
            message.setAttribute("role", "status");
            message.textContent = this.dataset.error;
            const retry = document.createElement("button");
            retry.type = "button";
            retry.textContent = this.dataset.retry;
            retry.addEventListener("click", () => this.refresh(true), {
              once: true,
            });
            this.replaceChildren(message, retry);
          } finally {
            if (this.request === request) this.removeAttribute("aria-busy");
          }
        }
        disconnectedCallback() {
          this.controller?.abort();
          this.request?.abort();
        }
      },
    );
  }
})();
