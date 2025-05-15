class TemplateContent extends HTMLElement {
	connectedCallback() {
		if (this.shadowRoot) return;

		const templateId = this.getAttribute("template-id");
		const template = document.getElementById(templateId);
		if (!template) return;

		const shadow = this.attachShadow({ mode: "open" });

		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "style.css";

		this.shadowRoot.appendChild(link);

		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("t-c", TemplateContent);
