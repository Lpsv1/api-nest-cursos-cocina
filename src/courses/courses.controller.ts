import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Course } from './entities/course.entity';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles('Administrador')
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiResponse({
    status: 201,
    description: 'Curso creado exitosamente',
    type: Course,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @Roles('Administrador', 'Empleado')
  @ApiOperation({ summary: 'Obtener cursos con filtrado y paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cursos obtenida exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(
    @Query() filterDto: FilterCourseDto,
  ): Promise<PaginatedResult<Course>> {
    return this.coursesService.findAll(filterDto);
  }

  @Get(':id')
  @Roles('Administrador', 'Empleado')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiResponse({
    status: 200,
    description: 'Curso obtenido exitosamente',
    type: Course,
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Actualizar un curso por ID' })
  @ApiResponse({
    status: 200,
    description: 'Curso actualizado exitosamente',
    type: Course,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Eliminar un curso por ID (soft delete)' })
  @ApiResponse({ status: 200, description: 'Curso desactivado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(+id);
  }
}
