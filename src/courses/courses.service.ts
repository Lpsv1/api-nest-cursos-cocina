import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async findAll(filterDto: FilterCourseDto): Promise<PaginatedResult<Course>> {
    const {
      page = 1,
      limit = 10,
      search,
      nivel_id,
      modalidad_id,
      turno_id,
      especialidad_id,
      estado,
      sortBy = 'id',
      order = 'ASC',
    } = filterDto;

    const skip = (page - 1) * limit;

    // Construir where con condiciones dinámicas
    const where: FindOptionsWhere<Course> = {};

    if (search) {
      where.nombre = Like(`%${search}%`);
    }

    if (nivel_id !== undefined) {
      where.nivel_id = nivel_id;
    }

    if (modalidad_id !== undefined) {
      where.modalidad_id = modalidad_id;
    }

    if (turno_id !== undefined) {
      where.turno_id = turno_id;
    }

    if (especialidad_id !== undefined) {
      where.especialidad_id = especialidad_id;
    }

    if (estado !== undefined) {
      where.estado = estado;
    }

    const [data, total] = await this.courseRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { [sortBy]: order },
      relations: ['nivel', 'modalidad', 'turno', 'especialidad'],
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['nivel', 'modalidad', 'turno', 'especialidad'],
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    // Actualizar propiedades
    Object.assign(course, updateCourseDto);

    return await this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);

    // Soft delete (cambiar estado a false)
    course.estado = false;
    await this.courseRepository.save(course);
  }

  async hardRemove(id: number): Promise<void> {
    const result = await this.courseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
  }
}
