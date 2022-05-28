import { moduleMetadata } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { Story, Meta } from '@storybook/angular/types-6-0'
import { ImageComponent } from 'src/app/image/image.component'

export default {
    title: 'Example/Image Component',
    component: ImageComponent,
} as Meta

const Template: Story<ImageComponent> = (args: ImageComponent) => ({
    component: ImageComponent,
    props: args,
})

export const NoImageCaption = Template.bind({});
NoImageCaption.args = {
    figCaptionTxt: ''
}

export const WithImageCaption = Template.bind({});
WithImageCaption.args = {
    figCaptionTxt: 'The French Quarter or White Town area in Pondicherry is filled with elegant colonial mansions in the midst of tree-lined boulevards, named on French streets beginning with "rue", numerous parks and charming cafés.'
}

export const WithFullOpacity = Template.bind({});
WithFullOpacity.args = {
    imgOpacity: 1
}

export const WithHalfOpacity = Template.bind({});
WithHalfOpacity.args = {
    imgOpacity: 0.5
}
