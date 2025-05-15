class TemplateContent extends HTMLElement {
	connectedCallback() {
		const templateId = this.getAttribute("template-id");
		let props = {};
		try {
			props = JSON.parse(this.getAttribute("props") || "{}");
		} catch (e) {
			console.error(
				`Failed to parse props JSON for template id ${templateId}:`,
				e,
			);
		}

		const childTemplateId = this.getAttribute("child-template-id");
		let childProps = {};
		try {
			childProps = JSON.parse(this.getAttribute("child-props") || "{}");
		} catch (e) {
			console.error(
				`Failed to parse child-props JSON for childTemplateId ${childTemplateId}:`,
				e,
			);
		}

		// Get and clone the main template
		const template = document.getElementById(templateId);
		if (!template) {
			console.error(`Template with id "${templateId}" not found`);
			return;
		}
		const content = template.content.cloneNode(true);

		// Apply props to the main template
		this.applyProps(content, props);

		// Handle child template if it exists
		if (childTemplateId) {
			const childTemplate = document.getElementById(childTemplateId);
			if (!childTemplate) {
				console.error(
					`Child template with id "${childTemplateId}" not found`,
				);
			} else {
				const childContent = childTemplate.content.cloneNode(true);

				// Apply props to the child template
				this.applyProps(childContent, childProps);

				// Find the pet container in the main template
				const childContainer = content.querySelector(".pet-container");
				if (childContainer) {
					// Append the entire child template to the container
					childContainer.appendChild(childContent);
				}
			}
		}

		// Append the main content to this element
		this.appendChild(content);
	}

	applyProps(content, props) {
		// Apply each property to elements with matching class names
		for (const [key, value] of Object.entries(props)) {
			const element = content.querySelector(`.${key}`);
			if (element) {
				element.textContent = value;
			}
		}
	}
}

customElements.define("t-c", TemplateContent);
