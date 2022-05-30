import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { LinkComponent } from '../link.component';
// This exports the Stories group for this component
export default {
  // The title defines the name and where in the structure of
  // Storybook's menu this is going to be placed.
  // Here we add it to a "Components" section under "Link"
  title: 'Components/Link',
  // The component related to the Stories
  component: LinkComponent,
  decorators: [
    // The necessary modules for the component to work on Storybook
    moduleMetadata({
      declarations: [LinkComponent],
      imports: [CommonModule],
    }),
  ],
};
// This creates a Story for the component
const Template: Story<LinkComponent> = () => ({
  component: LinkComponent,
  template: `<app-link [color]="color" [href]="href" [target]="target">{{content}}</app-link>`,
  props: {
      color: 'primary',
      content: 'Visit Storybook',
      href: 'https://storybook.js.org',
      target: '_blank'
  }
});
export const Base = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!