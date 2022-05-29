import { text, number, boolean } from '@storybook/addon-knobs';
import { Story, IStory } from '@storybook/angular'
import { TextComponent } from './text.component';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Components/Text Component'
}

const template: Story<TextComponent> = (args: TextComponent): IStory => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
    ]
  },
  component: TextComponent,
  props: {
    textValue: 'Initial Value',
    ...args
  }
})

export const displaying = template.bind({})
displaying.args = {
  state: 'displaying'
}

export const editing = template.bind({})
editing.args = {
  state: 'editing'
}

export const updating = template.bind({})
updating.args = {
  state: 'updating'
}
