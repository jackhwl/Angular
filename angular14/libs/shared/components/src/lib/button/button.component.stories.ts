import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'angular14-button-harness',
  template: '<angular14-button>{{ text }}</angular14-button>'
})
class ButtonHarnessComponent {
    @Input() text = 'Button';
}

export default {
  title: 'ButtonComponent',
  component: ButtonHarnessComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [ButtonComponent]
    })
  ],
} as Meta<ButtonHarnessComponent>;

const Template: Story<ButtonHarnessComponent> = (args: ButtonHarnessComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    text: 'Button'
}