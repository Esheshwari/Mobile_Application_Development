import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  StyleSheet, 
  SafeAreaView,
  Alert 
} from 'react-native';

// --- Reusable Skill Badge Component ---
const SkillBadge = ({ name }: { name: string }) => (
  <View style={styles.skillBadge}>
    <Text style={styles.skillText}>{name}</Text>
  </View>
);

const App = () => {

  const SOCIAL_LINKS = {
    email: 'mailto:esheshwaritiwari@gmail.com',
    linkedin: 'https://www.linkedin.com/in/esheshwari', 
    github: 'https://github.com/Esheshwari', 
    portfolio: 'https://esheshwari.github.io/my-portfolio/', 
  };

  // Fixed function: Removed the ": string" type and added a safer try/catch
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Notice", "If you are on a simulator, links like Email might not open. URL: " + url);
      }
    } catch (error) {
      Alert.alert("Error", "Could not open link.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View style={styles.imageOverlay}>
<Image
  source={{
    uri: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
  }}
  style={styles.profileImage}
/>


          </View>
          <Text style={styles.name}>Esheshwari Kumari</Text>
          <Text style={styles.title}>Co-Founder & CEO | Slate Analytics</Text>
          <View style={styles.badge}>
             <Text style={styles.location}>📍 Bangalore, India</Text>
          </View>
        </View>

        {/* --- CONTACT BUTTONS --- */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.emailBtn]} onPress={() => openLink(SOCIAL_LINKS.email)}>
            <Text style={styles.btnText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.linkedinBtn]} onPress={() => openLink(SOCIAL_LINKS.linkedin)}>
            <Text style={styles.btnText}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.githubBtn]} onPress={() => openLink(SOCIAL_LINKS.github)}>
            <Text style={styles.btnText}>GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* --- EXPERIENCE SECTION --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          <View style={styles.item}>
            <View style={styles.experienceHeader}>
               <Text style={styles.itemTitle}>Co-Founder & CEO</Text>
               <Text style={styles.dateLabel}>2024 - Present</Text>
            </View>
            <Text style={styles.companyName}>Slate Analytics IT Services</Text>
            <Text style={styles.itemDesc}>• Scaled a global IT consulting venture delivering AI & automation.</Text>
            <Text style={styles.itemDesc}>• Managed 200+ engineers for 100+ distinct projects.</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
             <Text style={styles.itemTitle}>Software Developer</Text>
             <Text style={styles.companyName}>GirlScript Summer of Code</Text>
             <Text style={styles.itemDesc}>• Built backend microservices using Node.js and Express.</Text>
          </View>
        </View>

        {/* --- TECH SKILLS SECTION --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Technical Expertise</Text>
          <View style={styles.skillCloud}>
            <SkillBadge name="Python" />
            <SkillBadge name="SQL" />
            <SkillBadge name="Java (DSA)" />
            <SkillBadge name="Node.js" />
            <SkillBadge name="React.js" />
            <SkillBadge name="ML (Scikit-learn)" />
            <SkillBadge name="Power BI" />
            <SkillBadge name="PostgreSQL" />
          </View>
        </View>

        {/* --- BUSINESS & SOFT SKILLS SECTION --- */}
        <View style={[styles.sectionCard, { borderColor: '#10b981' }]}>
          <Text style={[styles.sectionTitle, { color: '#10b981' }]}>Leadership & Business</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>✦</Text>
            <Text style={styles.bulletText}>Strategic Leadership: Headed team of 200+ members.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>✦</Text>
            <Text style={styles.bulletText}>Public Speaking: GDG Speaker for 500+ participants.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>✦</Text>
            <Text style={styles.bulletText}>Agile Methodologies & Stakeholder Management.</Text>
          </View>
        </View>

        {/* --- EDUCATION SECTION --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>RV University, Bangalore</Text>
            <Text style={styles.itemSubtitle}>BCA (Hons) • Computer Science</Text>
            <View style={styles.tag}><Text style={styles.tagText}>CGPA: 9.36/10</Text></View>
          </View>
        </View>

        {/* --- PROJECTS SECTION --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Task Prioritization System</Text>
            <Text style={styles.itemDesc}>AI system to classify tasks using Random Forest & Logistic Regression.</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Zerodha Clone</Text>
            <Text style={styles.itemDesc}>Full-stack trading dashboard built with MERN stack.</Text>
          </View>
        </View>

        {/* --- CERTIFICATIONS SECTION --- */}
        <View style={[styles.sectionCard, { borderColor: '#f59e0b' }]}>
          <Text style={[styles.sectionTitle, { color: '#f59e0b' }]}>Certifications</Text>
          <View style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: '#f59e0b' }]}>🏅</Text>
            [cite_start]<Text style={styles.bulletText}>JP Morgan Software Engineering Job Simulation [cite: 1]</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: '#f59e0b' }]}>🏅</Text>
            [cite_start]<Text style={styles.bulletText}>Postman API Fundamentals Student Expert [cite: 1]</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: '#f59e0b' }]}>🏅</Text>
            [cite_start]<Text style={styles.bulletText}>Get Started with Python - Google [cite: 1]</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: '#f59e0b' }]}>🏅</Text>
            [cite_start]<Text style={styles.bulletText}>Linux and SQL - Google [cite: 1]</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: '#f59e0b' }]}>🏅</Text>
            [cite_start]<Text style={styles.bulletText}>150+ Microsoft Learn Trophies & Badges [cite: 1, 5]</Text>
          </View>
        </View>
        
        {/* --- ACHIEVEMENTS SECTION --- */}
        <View style={[styles.sectionCard, { borderColor: '#8b5cf6' }]}>
          <Text style={[styles.sectionTitle, { color: '#8b5cf6' }]}>Achievements</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>🏆</Text>
            [cite_start]<Text style={styles.bulletText}>Top 3 Rank: National Conference on Mathematical Advances 2025 for AI-driven recommendation systems research[cite: 1].</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>🎓</Text>
            [cite_start]<Text style={styles.bulletText}>Merit Scholarship holder at RV University for outstanding academic excellence[cite: 1].</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>✨</Text>
            [cite_start]<Text style={styles.bulletText}>Recognized contributor across Microsoft Learn ecosystem with 150+ badges and trophies[cite: 1, 5].</Text>
          </View>
        </View>

        {/* --- FOOTER BUTTON --- */}
        <TouchableOpacity 
          style={styles.portfolioButton} 
          onPress={() => openLink(SOCIAL_LINKS.portfolio)}
        >
          <Text style={styles.portfolioBtnText}>Visit Full Portfolio</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContainer: { paddingBottom: 40 },
  header: {
    alignItems: 'center',
    paddingVertical: 35,
    backgroundColor: '#1e293b',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#334155',
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  imageOverlay: {
    padding: 5,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#38bdf8',
    marginBottom: 15,
  },
  name: { fontSize: 26, fontWeight: '800', color: '#f8fafc' },
  title: { fontSize: 13, color: '#94a3b8', marginTop: 5, fontWeight: '500' },
  badge: { backgroundColor: '#334155', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 12 },
  location: { fontSize: 12, color: '#38bdf8', fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20, gap: 12 },
  button: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  emailBtn: { backgroundColor: '#38bdf8' }, 
  linkedinBtn: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' }, 
  githubBtn: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155' }, 
  btnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  sectionCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#38bdf8', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 2 },
  item: { marginBottom: 5 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#f1f5f9' },
  companyName: { fontSize: 14, color: '#38bdf8', fontWeight: '600', marginBottom: 4 },
  itemSubtitle: { fontSize: 14, color: '#94a3b8' },
  experienceHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  dateLabel: { color: '#38bdf8', fontSize: 11, fontWeight: 'bold' },
  tag: { backgroundColor: 'rgba(56, 189, 248, 0.1)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 8 },
  tagText: { color: '#38bdf8', fontSize: 11, fontWeight: 'bold' },
  itemDesc: { fontSize: 13, color: '#94a3b8', lineHeight: 20, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  skillCloud: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { backgroundColor: '#0f172a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#334155' },
  skillText: { color: '#f1f5f9', fontSize: 12, fontWeight: '600' },
  bulletItem: { flexDirection: 'row', marginBottom: 8 },
  bulletPoint: { color: '#10b981', marginRight: 10 },
  bulletText: { color: '#94a3b8', fontSize: 13, flex: 1 },
  portfolioButton: { margin: 20, backgroundColor: '#38bdf8', padding: 18, borderRadius: 20, alignItems: 'center' },
  portfolioBtnText: { color: '#0f172a', fontSize: 16, fontWeight: '900', textTransform: 'uppercase' }
});

export default App;
