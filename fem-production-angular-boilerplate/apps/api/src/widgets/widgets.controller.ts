import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Post()
  create(@Body() createWidgetDto: CreateWidgetDto) {
    return this.widgetsService.create(createWidgetDto);
  }

  @Get()
  findAll() {
    return this.widgetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.widgetsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateWidgetDto: UpdateWidgetDto) {
    return this.widgetsService.update(+id, updateWidgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.widgetsService.remove(+id);
  }
}
