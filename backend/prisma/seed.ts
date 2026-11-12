import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for "Mirage by ReWear"...');

  // Limpiar datos existentes de prueba para evitar duplicaciones
  await prisma.feature.deleteMany({});
  await prisma.teamMember.deleteMany({});

  // 1. Sembrar funcionalidades de la landing
  const featuresData = [
    {
      title: 'Armario Digital',
      description:
        'Digitaliza, clasifica y gestiona tus prendas reales en un catálogo inteligente accesible en la palma de tu mano.',
      icon: 'wardrobe',
      category: 'Organización Inteligente',
    },
    {
      title: 'Estilista IA',
      description:
        'Algoritmos de inteligencia artificial que recomiendan combinaciones personalizadas según tu estilo, clima y ocasión.',
      icon: 'sparkles',
      category: 'Inteligencia Artificial',
    },
    {
      title: 'Avatar y Probador Virtual',
      description:
        'Genera un avatar 3D con tus medidas exactas para visualizar cómo te queda cada outfit antes de vestirte o comprar.',
      icon: 'user-check',
      category: '3D & Fitting',
    },
    {
      title: 'Realidad Aumentada',
      description:
        'Experimenta con texturas, accesorios y prendas proyectadas en tiempo real mediante AR de alta precisión en tu móvil.',
      icon: 'camera',
      category: 'Experiencia Inmersiva',
    },
    {
      title: 'Comunidad',
      description:
        'Conéctate con otros entusiastas de la moda sostenible, comparte tus mejores looks e intercambia prendas con estilo circular.',
      icon: 'users',
      category: 'Moda Sostenible y Social',
    },
  ];

  for (const feature of featuresData) {
    await prisma.feature.create({
      data: feature,
    });
  }
  console.log(`✅ Inserción de ${featuresData.length} funcionalidades completada.`);

  // 2. Sembrar miembros del equipo
  const teamData = [
    {
      name: 'Sofía Valenzuela',
      role: 'Product Owner',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Visionaria del producto enfocada en la convergencia entre moda sostenible, economía circular y experiencias tecnológicas.',
    },
    {
      name: 'Mateo Herrera',
      role: 'Lead Developer',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Ingeniero de software con experiencia en visión artificial, modelos generativos y arquitecturas en la nube de alto rendimiento.',
    },
    {
      name: 'Valentina Ríos',
      role: 'UI/UX Designer',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      bio: 'Especialista en diseño de interacción y realidad aumentada, creando interfaces cautivadoras que humanizan la tecnología.',
    },
  ];

  for (const member of teamData) {
    await prisma.teamMember.create({
      data: member,
    });
  }
  console.log(`✅ Inserción de ${teamData.length} miembros del equipo completada.`);

  console.log('✨ Seeding completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
